export default async function handler(req,res){

const { url } = req.query

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

// INSTAGRAM + FACEBOOK
if(url.includes("instagram") || url.includes("facebook") || url.includes("fb.watch")){

const r = await fetch("https://snapsave.app/action.php?url="+encodeURIComponent(url))
const html = await r.text()

// simple video url extract
const match = html.match(/https:[^"]+\.mp4/g)

if(match){
return res.status(200).json({ video: match[0] })
}

return res.status(400).json({error:"Video not found"})
}

// YOUTUBE
if(url.includes("youtube") || url.includes("youtu.be")){

return res.status(400).json({error:"YouTube disabled on serverless"})
}

return res.status(400).json({error:"Unsupported link"})

}catch(e){

return res.status(500).json({error:"Fetch failed"})

}

}
