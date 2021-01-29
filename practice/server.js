const http = require("http");
const url = require("url");
const services = require("../services");
const jsonBody = require("body/json");

const server = http.createServer();
server.on("request", (req, res) => {
    let parsedUrl = url.parse(req.url, true);
    if (req.method === "GET" && parsedUrl.pathname === "/metadata") {
        const id = parsedUrl.query.id;
        metadata = services.fetchImageMetadata(id);
        console.log(req.headers);
    }

    jsonBody(req, res, (err, body) => {
        if (err) {
            console.error(err);
        } else {
            console.log(body[1]);
        }
    });
});


server.listen(2131);