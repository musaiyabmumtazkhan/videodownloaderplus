export default async function handler(req,res){

const {url}=req.query

if(!url){
return res.status(400).json({error:"URL missing"})
}

try{

const response=await fetch(
"https://tikwm.com/api/?url="+encodeURIComponent(url)
)

const data=await response.json()

return res.status(200).json({

video:data.data.play,
thumbnail:data.data.cover

})

}

catch(e){

return res.status(500).json({error:"Download failed"})

}

}
