export default async function handler(req, res) {

const { url } = req.query;

if (!url) {
return res.status(400).json({ error: "No URL provided" });
}

try {

const response = await fetch(
"https://tikwm.com/api/?url=" + encodeURIComponent(url)
);

const data = await response.json();

if (!data.data) {
return res.status(404).json({ error: "Video not found" });
}

return res.status(200).json({
video: data.data.play
});

} catch (error) {

return res.status(500).json({ error: "Server error" });

}

}
