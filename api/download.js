import ytdlp from "yt-dlp-exec"

export default async function handler(req,res){

const {url}=req.query

try{

const info=await ytdlp(url,{
dumpSingleJson:true,
noWarnings:true
})

let video=info.url

res.status(200).json({video})

}

catch(e){

res.status(500).json({error:"Download failed"})

}

}