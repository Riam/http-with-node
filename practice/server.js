const http = require("http");
const url = require("url");
const services = require("../services");

const server = http.createServer();
server.on("request", (req, res) => {
    let parsedUrl = url.parse(req.url, true);
    if (req.method === "GET" && parsedUrl.pathname === "/metadata") {
        const id = parsedUrl.query.id;
        metadata = services.fetchImageMetadata(id);
        console.log(req.headers);
    }

    let buffer = [];
    req.on("data", (chunk) => {
        buffer.push(chunk);
    }).on("end", () => {
        const parsedJson = JSON.parse(Buffer.concat(buffer));
        console.log(parsedJson[0].userName);
        services.createUser(parsedJson[0].userName)
    });
});



server.listen(2131);