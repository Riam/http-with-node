// use the following command to generate a key cert pair
// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes -subj "/"

const https = require("https");
const fs = require("fs");

const server = https.createServer({
    key: fs.readFileSync("./practice/key.pem"),
    cert: fs.readFileSync("./practice/cert.pem")
});
server.on("request", (req, res) => {
    res.end("This was served with https!");
});


server.listen(443);