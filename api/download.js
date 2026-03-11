export default async function handler(req, res) {

const url = req.query.url;

try {

const response = await fetch("https://tikwm.com/api/?url=" + encodeURIComponent(url));

const data = await response.json();

if(!data.data){
return res.status(400).json({error:"Video not found"});
}

res.status(200).json({
video:data.data.play
});

}

catch(e){

res.status(500).json({error:"Server error"});

}

}
