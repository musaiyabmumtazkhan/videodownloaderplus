const input = document.getElementById("url")
const preview = document.getElementById("preview")
const downloadBtn = document.getElementById("downloadBtn")
const loader = document.getElementById("loader")

function detectPlatform(url){

if(url.includes("tiktok")) return "🎵"
if(url.includes("instagram")) return "📸"
if(url.includes("facebook")) return "📘"
if(url.includes("youtube")) return "▶️"

return "🎬"

}

// clipboard button
document.getElementById("pasteBtn").onclick = async ()=>{

const text = await navigator.clipboard.readText()

input.value = text

fetchVideo()

}

// clipboard auto detect
window.addEventListener("load", async ()=>{

try{

const text = await navigator.clipboard.readText()

if(text.includes("http")){

input.value = text
fetchVideo()

}

}catch{}

})

// auto fetch
input.addEventListener("paste", ()=>{

setTimeout(fetchVideo,300)

})

async function fetchVideo(){

const url = input.value

document.getElementById("platformIcon").innerText = detectPlatform(url)

loader.style.display="block"

try{

const res = await fetch("/api/download?url="+encodeURIComponent(url))
const data = await res.json()

loader.style.display="none"

preview.src = data.video
preview.style.display="block"

downloadBtn.style.display="block"

downloadBtn.onclick = ()=>{

downloadVideo(data.video)

}

}catch{

loader.style.display="none"
alert("Fetch failed")

}

}

// direct download
function downloadVideo(url){

fetch(url)
.then(r=>r.blob())
.then(blob=>{

const a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="clipsnap-video.mp4"

document.body.appendChild(a)

a.click()

document.body.removeChild(a)

})

}
