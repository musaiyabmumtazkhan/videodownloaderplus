export default async function handler(req,res){

const {url} = req.query

if(!url){

return res.status(400).json({error:"URL missing"})

}

try{

// TIKTOK

if(url.includes("tiktok")){

const r = await fetch("https://tikwm.com/api/?url="+encodeURIComponent(url))
const data = await r.json()

return res.status(200).json({
video:data.data.play
})

}


// INSTAGRAM

if(url.includes("instagram")){

const r = await fetch("https://igram.world/api/ig?url="+encodeURIComponent(url))
const data = await r.json()

return res.status(200).json({
video:data.video
})

}


// FACEBOOK

if(url.includes("facebook") || url.includes("fb.watch")){

const r = await fetch("https://fdown.net/api?url="+encodeURIComponent(url))
const data = await r.json()

return res.status(200).json({
video:data.hd
})

}


// YOUTUBE

if(url.includes("youtube") || url.includes("youtu.be")){

const r = await fetch("https://yt1s.io/api/ajaxSearch/index?query="+encodeURIComponent(url))
const data = await r.json()

return res.status(200).json({
video:data.links.mp4.auto.url
})

}

return res.status(400).json({error:"Unsupported link"})

}catch{

return res.status(500).json({error:"Download failed"})

}

}
