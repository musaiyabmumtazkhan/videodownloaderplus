const input = document.getElementById("url")

// PASTE BUTTON
document.getElementById("pasteBtn").onclick = async () => {

const text = await navigator.clipboard.readText()

input.value = text

detectPlatform(text)

}

// AUTO CLIPBOARD DETECT
window.addEventListener("load", async () => {

try{

const text = await navigator.clipboard.readText()

if(text.includes("http")){

input.value = text
detectPlatform(text)

}

}catch{}

})

function detectPlatform(url){

if(url.includes("tiktok")) return platform("🎵")
if(url.includes("instagram")) return platform("📸")
if(url.includes("facebook")) return platform("📘")
if(url.includes("youtube")) return platform("▶️")

}

function platform(icon){

document.getElementById("platform").innerText = icon

}

// FETCH VIDEO
async function fetchVideo(){

const url = input.value

const res = await fetch("/api/download?url="+encodeURIComponent(url))

const data = await res.json()

document.getElementById("thumb").src = data.thumbnail

document.getElementById("player").src = data.video

document.getElementById("result").style.display = "block"

document.getElementById("downloadBtn").onclick = () => {

downloadVideo(data.video)

}

}

// DIRECT DOWNLOAD
function downloadVideo(url){

const a = document.createElement("a")

a.href = url
a.download = "clipsnap-video.mp4"

document.body.appendChild(a)

a.click()

document.body.removeChild(a)

}
