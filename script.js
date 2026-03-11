const input = document.getElementById("url")

// PASTE BUTTON
document.getElementById("pasteBtn").addEventListener("click", async () => {

try{

const text = await navigator.clipboard.readText()

input.value = text

}catch{

alert("Clipboard access denied")

}

})

// FETCH VIDEO
document.getElementById("fetchBtn").addEventListener("click", async () => {

const url = input.value

if(!url){

alert("Paste video link first")

return

}

try{

const res = await fetch("/api/download?url=" + encodeURIComponent(url))

const data = await res.json()

if(data.video){

downloadVideo(data.video)

}else{

alert("Video not found")

}

}catch{

alert("Fetch failed")

}

})

// DIRECT DOWNLOAD
function downloadVideo(url){

const a = document.createElement("a")

a.href = url
a.download = "clipsnap-video.mp4"

document.body.appendChild(a)

a.click()

document.body.removeChild(a)

}
