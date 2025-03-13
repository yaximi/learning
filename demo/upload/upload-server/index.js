const express = require('express')
const cors = require('cors')
const fse = require('fs-extra')
const multiparty = require('multiparty')
const path = require('path')

const app = express()
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) // 解决跨域问题

const UPLOADS_DIR = path.resolve(__dirname, 'uploads');

function extractExt(fileName) {
  return fileName.slice(fileName.lastIndexOf('.'), fileName.length)
}

// 校验接口
app.post('/verify', function(req, res) {
  const { fileName, fileHash } = req.body

  // 如果已经存在该文件，不用上传，直接返回成功，即：秒传
  const filePath = path.resolve(UPLOADS_DIR, fileHash + extractExt(fileName))
  if (fse.existsSync(filePath)) {
    res
      .status(200)
      .json({
        ok: true,
        data: {
          shouldUpload: false
        }
      })
    return
  }

  // 如果存在保存chunk的临时文件夹，返回已上传的chunk，客户端过滤掉已上传的chunk，实现断点续传
  let existChunks = []
  const chunkDir = path.resolve(UPLOADS_DIR, fileHash)
  if (fse.existsSync(chunkDir)) {
    existChunks = fse.readdirSync(chunkDir)
  }
  res
    .status(200)
    .json({
      ok: true,
      data: {
        shouldUpload: true,
        existChunks
      }
    })
})

// 上传接口
app.post('/upload', function(req, res) {
  const form = new multiparty.Form()
  form.parse(req, function(error, fields, files) {
    if (error) {
      res
        .status(401)
        .json({
          ok: false,
          msg: '上传失败，请重新上传'
        })
      return
    }

    const fileHash = fields['fileHash'][0]
    const chunkHash = fields['chunkHash'][0]

    // 保存chunk的临时文件夹路径（绝对路径）
    const chunkDir = path.resolve(UPLOADS_DIR, fileHash)
    // 不存在保存chunk的临时文件夹
    if (!fse.existsSync(chunkDir)) {
      // 新建保存chunk的临时文件夹
      fse.mkdirSync(chunkDir)
    }

    // 将chunk移动到chunkDir中
    const curChunkPath = files['chunk'][0]['path']
    const newChunkPath = path.resolve(chunkDir, chunkHash)
    fse.moveSync(curChunkPath, newChunkPath)

    res
      .status(200)
      .json({
        ok: true,
        msg: '上传成功'
      })
  })
})

// 合并接口
app.post('/merge', async function(req, res) {
  const { fileName, fileHash, chunkSize } = req.body

  // 如果已经存在该文件，直接返回合并成功
  const filePath = path.resolve(UPLOADS_DIR, fileHash + extractExt(fileName))
  if (fse.existsSync(filePath)) {
    res
      .status(200)
      .json({
        ok: true,
        msg: '合并成功'
      })
    return
  }

  // 如果不存在保存chunk的临时文件夹，报错
  const chunkDir = path.resolve(UPLOADS_DIR, fileHash)
  if (!fse.existsSync(chunkDir)) {
    res
      .status(401)
      .json({
        ok: false,
        msg: '合并失败，请重新上传'
      })
    return
  }

  // 读取chunkDir，获取所有chunk文件名
  const chunkNames = fse.readdirSync(chunkDir)
  // 按索引值从小到大排序
  chunkNames.sort((a, b) => {
    return a.split('-')[1] - b.split('-')[1]
  })
  // 合并
  const tasks = chunkNames.map((chunkName, index) => {
    return new Promise((resolve, reject) => {
      // chunk文件路径
      const chunkPath = path.resolve(chunkDir, chunkName)

      // 创建读取流，读取chunk文件
      const readStream = fse.createReadStream(chunkPath)
      readStream.on('end', () => {
        // 读取完成，删除chunk文件
        fse.unlinkSync(chunkPath)
        resolve()
      })

      // 创建写入流，写入文件
      const writeStream = fse.createWriteStream(filePath, {
        start: index * chunkSize,
        end: (index + 1) * chunkSize
      })

      // 管道
      readStream.pipe(writeStream)
    })
  })
  // 等待所有chunk读取完成
  await Promise.all(tasks)

  // 删除临时文件夹
  fse.removeSync(chunkDir)

  res
    .status(200)
    .json({
      ok: true,
      msg: '合并成功'
    })
})

app.listen('3000', () => {
  console.log('Server is running on port 3000')
})
