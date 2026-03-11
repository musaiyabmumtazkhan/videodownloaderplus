const input = document.getElementById("url")

// THEME TOGGLE
document.getElementById("themeToggle").onclick=()=>{

document.body.classList.toggle("light")

}

// PASTE BUTTON
document.getElementById("pasteBtn").onclick = async ()=>{

const text = await navigator.clipboard.readText()

input.value = text

}

// PLATFORM ICON
function detect(url){

if(url.includes("tiktok")) return "🎵"
if(url.includes("instagram")) return "📸"
if(url.includes("facebook")) return "📘"
if(url.includes("youtube")) return "▶️"

return "🎬"

}

// FETCH VIDEO
document.getElementById("fetchBtn").onclick = async ()=>{

const url=input.value

document.getElementById("platform").innerText=detect(url)

const res=await fetch("/api/download?url="+encodeURIComponent(url))

const data=await res.json()

document.getElementById("thumb").src=data.thumbnail

document.getElementById("downloadSection").style.display="block"

document.getElementById("downloadBtn").onclick=()=>{

download(data.video)

}

}

// DIRECT DOWNLOAD
function download(url){

fetch(url)
.then(r=>r.blob())
.then(blob=>{

const a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="clipsnap-video.mp4"

a.click()

})

}
