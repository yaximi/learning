window.onload = function () {
    var oClose = document.getElementsByClassName('icon-guanbi')[0]
    var oHongbaoContainer = document.getElementsByClassName('hongbao-container')[0]

    oClose.onclick = function () {
        oClose.classList.add('fade-out')
        setTimeout(() => {
            oClose.classList.add('hide')
            oClose.classList.remove('fade-out')
        }, 500)

        oHongbaoContainer.classList.remove('tada')
        oHongbaoContainer.classList.add('to-top')
        setTimeout(() => {
            oHongbaoContainer.classList.add('shake')
            setTimeout(() => {
                oHongbaoContainer.classList.remove('shake')
            }, 300)
        }, 2000)
    }
}