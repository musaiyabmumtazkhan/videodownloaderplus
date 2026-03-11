async function getVideo(){

let url=document.getElementById("url").value

let res=await fetch("/api/download?url="+encodeURIComponent(url))

let data=await res.json()

let video=document.getElementById("preview")

video.src=data.video

document.getElementById("download").href=data.video

}