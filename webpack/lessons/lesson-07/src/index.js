import "assets/css/common.css"
import "assets/css/index.css"

var img = document.createElement("img")
img.src = require("./assets/images/award.png")
document.querySelector(".main").appendChild(img)

var div = document.createElement("div")
div.innerHTML = "test"
document.querySelector(".main").appendChild(div)