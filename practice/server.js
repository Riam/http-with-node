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
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.write(JSON.stringify(metadata));
        res.end();
    } else if (req.method === "POST" && parsedUrl.pathname === "/user") {
        jsonBody(req, res, (err, body) => {
            if (err) {
                console.error(err);
                res.statusCode = 401;
                res.end();
            } else {
                services.createUser(body["userName"]);
                res.statusCode = 201;
                res.end();
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader("X-Powered-By", "Node");
        res.setHeader("Content-Type", "application/json");

        res.end();
    }


});


server.listen(2131);