const input=document.getElementById("url")

input.addEventListener("paste",()=>{

setTimeout(fetchVideo,500)

})

async function fetchVideo(){

const url=input.value

const res=await fetch("/api/download?url="+encodeURIComponent(url))

const data=await res.json()

const player=document.getElementById("player")
const thumb=document.getElementById("thumb")

player.src=data.video
player.style.display="block"

if(data.thumbnail){

thumb.src=data.thumbnail
thumb.style.display="block"

}

document.getElementById("download").href=data.video

}
