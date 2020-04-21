import './index.css'

function element() {
    var element = document.createElement('div')
    element.innerHTML = 'Hello webpack'
    element.classList.add('hello')
    return element
}

document.body.appendChild(element())