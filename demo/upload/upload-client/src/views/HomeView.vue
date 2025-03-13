<script setup lang="ts">
import { ref } from 'vue'
import SparkMD5 from 'spark-md5'

let fileName = '' // 文件名
let fileHash = '' // 文件hash
const percentage = ref<number>(0) // 百分比
const CHUNK_SIZE = 1 * 1024 * 1024 // 分片大小 1M

/**
 * 文件分片
 * @param file 文件
 * @param chunkSize 分片大小
 */
function createChunks(file: File, chunkSize: number) {
  const chunks = []

  let index = 0
  while (index < file.size) {
    const blob = file.slice(index, index + chunkSize)
    chunks.push(blob)
    index += chunkSize
  }

  return chunks
}

/**
 * hash计算（增量算法）
 * @param chunks 文件分片
 */
function calculateHash(chunks: Blob[]) {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5()

    function _read(index: number) {
      if (index >= chunks.length) {
        resolve(spark.end())
        return
      }

      const chunk = chunks[index]
      const reader = new FileReader()
      reader.onload = function(e) {
        const bytes = e.target.result
        spark.append(bytes)
        _read(index + 1)
      }
      reader.readAsArrayBuffer(chunk)
    }

    _read(0)
  })
}

/**
 * 校验
 */
function verify() {
  return fetch('http://localhost:3000/verify', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      fileName,
      fileHash,
      chunkSize: CHUNK_SIZE
    })
  })
    .then(res => res.json())
}

/**
 * 合并
 */
function merge() {
  fetch('http://localhost:3000/merge', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      fileName,
      fileHash,
      chunkSize: CHUNK_SIZE
    })
  })
    .then(res => res.json())
    .then(res => {
      alert('合并成功')
    })
}

async function uploadChunks(chunks: Blob[], existChunks: string[]) {
  const data = chunks
    .map((chunk, index) => ({
      fileHash,
      chunkHash: `${fileHash}-${index}`,
      chunk
    }))

  const formDatas = data
    .filter((item) => !existChunks.includes(item.chunkHash))
    .map((item) => {
      const formData = new FormData()
      formData.append('fileHash', item.fileHash)
      formData.append('chunkHash', item.chunkHash)
      formData.append('chunk', item.chunk)
      return formData
    })

  let index = 0
  const max = 6 // 最大并发请求数
  const taskPool = [] // 请求池
  while(index < formDatas.length) {
    const task = fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formDatas[index]
    })
    task.then(() => {
      taskPool.splice(taskPool.findIndex(item => item === task), 1)
    })
    taskPool.push(task)
    if (taskPool.length === max) {
      await Promise.race(taskPool)
    }
    index++
    percentage.value = (index / formDatas.length * 100).toFixed(0)
  }
  await Promise.all(taskPool)

  // 通知服务器合并chunk
  merge()
}

/**
 * 选择文件
 * @param e 
 */
async function handleUpload(e: Event) {
  // 读取文件
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  const file = files[0]
  fileName = file.name

  // 文件分片
  const chunks = createChunks(file, CHUNK_SIZE)
  
  // hash计算
  fileHash = await calculateHash(chunks)

  // 校验
  const { data = {} } = await verify()
  const { shouldUpload, existChunks = [] } = data
  if (!shouldUpload) {
    // 秒传
    percentage.value = 100
    alert('秒传：上传成功')
    return
  }

  // 上传分片
  uploadChunks(chunks, existChunks)
}
</script>

<template>
  <main>
    <h1>大文件上传</h1>
    <input type="file" @change="handleUpload">
    <div>进度：{{ percentage }}%</div>
  </main>
</template>
