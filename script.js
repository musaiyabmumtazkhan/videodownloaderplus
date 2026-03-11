const input = document.getElementById("url")

// AUTO FETCH WHEN PASTE
input.addEventListener("paste", () => {

setTimeout(fetchVideo, 400)

})

// PASTE BUTTON
document.getElementById("pasteBtn").onclick = async () => {

try{

const text = await navigator.clipboard.readText()

input.value = text

fetchVideo()

}catch{

alert("Clipboard blocked")

}

}


// FETCH VIDEO
async function fetchVideo(){

const url = input.value

if(!url) return

try{

const res = await fetch("/api/download?url=" + encodeURIComponent(url))

const data = await res.json()

if(!data.video){

alert("Video not found")
return

}

// SHOW PREVIEW
showPreview(data.video)

}catch{

alert("Fetch failed")

}

}


// VIDEO PREVIEW
function showPreview(videoUrl){

let preview = document.getElementById("preview")

if(!preview){

preview = document.createElement("video")

preview.id = "preview"
preview.controls = true
preview.style.width = "100%"
preview.style.marginTop = "15px"

document.querySelector(".card").appendChild(preview)

}

preview.src = videoUrl


showDownload(videoUrl)

}


// DOWNLOAD BUTTON
function showDownload(videoUrl){

let btn = document.getElementById("downloadBtn")

if(!btn){

btn = document.createElement("button")

btn.id = "downloadBtn"
btn.innerText = "Download Video"

btn.style.marginTop = "10px"

document.querySelector(".card").appendChild(btn)

}

btn.onclick = () => {

downloadVideo(videoUrl)

}

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
