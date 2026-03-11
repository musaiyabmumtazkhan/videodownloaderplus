const input = document.getElementById("url")
const fetchBtn = document.getElementById("fetchBtn")

// PASTE BUTTON
document.getElementById("pasteBtn").onclick = async () => {

try{

const text = await navigator.clipboard.readText()
input.value = text

}catch{

alert("Clipboard access blocked")

}

}

// FETCH VIDEO
fetchBtn.onclick = async () => {

const url = input.value

if(!url){
alert("Paste video link first")
return
}

fetchBtn.innerText = "Fetching..."

try{

const res = await fetch("/api/download?url=" + encodeURIComponent(url))
const data = await res.json()

if(!data.video){
alert("Video not found")
fetchBtn.innerText = "Fetch Video"
return
}

// DOWNLOAD BUTTON CREATE
showDownload(data.video)

fetchBtn.innerText = "Fetch Video"

}catch{

alert("Fetch failed")
fetchBtn.innerText = "Fetch Video"

}

}


// SHOW DOWNLOAD BUTTON
function showDownload(videoUrl){

let oldBtn = document.getElementById("downloadBtn")

if(oldBtn) oldBtn.remove()

const btn = document.createElement("button")

btn.id = "downloadBtn"
btn.innerText = "Download Video"

btn.style.marginTop = "15px"

btn.onclick = () => {

downloadVideo(videoUrl)

}

document.querySelector(".card").appendChild(btn)

}


// DIRECT DOWNLOAD
function downloadVideo(url){

fetch(url)
.then(res => res.blob())
.then(blob => {

const a = document.createElement("a")

a.href = URL.createObjectURL(blob)

a.download = "clipsnap-video.mp4"

document.body.appendChild(a)

a.click()

document.body.removeChild(a)

})

}
