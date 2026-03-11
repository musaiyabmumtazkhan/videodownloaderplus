const input=document.getElementById("url")

input.addEventListener("paste",()=>{

setTimeout(fetchVideo,500)

})

function detectPlatform(url){

if(url.includes("tiktok")) return "🎵"
if(url.includes("instagram")) return "📸"
if(url.includes("facebook")) return "📘"
if(url.includes("youtube")) return "▶️"

return "🎬"

}

async function fetchVideo(){

const url=input.value

document.getElementById("platform").innerText=detectPlatform(url)

const res=await fetch("/api/download?url="+encodeURIComponent(url))

const data=await res.json()

document.getElementById("thumb").src=data.thumbnail
document.getElementById("thumb").style.display="block"

document.getElementById("player").src=data.video

document.getElementById("download").href=data.video

animateProgress()

}

function animateProgress(){

let bar=document.getElementById("bar")

let w=0

let i=setInterval(()=>{

w+=10

bar.style.width=w+"%"

if(w>=100) clearInterval(i)

},100)

}
