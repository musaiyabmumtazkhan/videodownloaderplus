const input = document.getElementById("url")

const preview = document.getElementById("preview")
const downloadBtn = document.getElementById("downloadBtn")
const loader = document.getElementById("loader")
const progress = document.querySelector(".progress")
const bar = document.getElementById("progressBar")

// PLATFORM ICON DETECT

function detectPlatform(url){

if(url.includes("tiktok")) return "🎵"
if(url.includes("instagram")) return "📸"
if(url.includes("facebook")) return "📘"
if(url.includes("youtube")) return "▶️"

return "🎬"

}

// AUTO FETCH ON PASTE

input.addEventListener("paste", ()=>{

setTimeout(fetchVideo,400)

})

// PASTE BUTTON

document.getElementById("pasteBtn").onclick = async ()=>{

const text = await navigator.clipboard.readText()

input.value = text

fetchVideo()

}

// FETCH VIDEO

async function fetchVideo(){

const url = input.value

document.getElementById("platformIcon").innerText = detectPlatform(url)

loader.style.display = "block"

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

// DOWNLOAD WITH PROGRESS

function downloadVideo(url){

progress.style.display="block"

fetch(url)
.then(res=>res.body.getReader())
.then(reader=>{

let received=0

function read(){

reader.read().then(({done,value})=>{

if(done) return

received += value.length

bar.style.width = (received/1000000)*100 + "%"

read()

})

}

read()

})

}
