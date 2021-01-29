const http = require("http");
const url = require("url");
const services = require("../services");
const jsonBody = require("body/json");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer();
server.on("request", (req, res) => {
    req.on("error", (err) => {
        console.error(`request error: ${err}`);
    });

    res.on("error", (err) => {
        console.error(`request error: ${err}`);
    });

    let parsedUrl = url.parse(req.url, true);
    if (req.method === "GET" && parsedUrl.pathname === "/metadata") {
        const id = parsedUrl.query.id;
        metadata = services.fetchImageMetadata(id);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.write(JSON.stringify(metadata));
        res.end();
    } else if (req.method === "POST" && parsedUrl.pathname === "/users") {
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
    } else if (req.method === "POST" && parsedUrl.pathname === "/upload") {
        const form = formidable.IncomingForm({
            uploadDir: __dirname,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5 megs
            multiples: true
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                res.statusCode = 501;
                res.end("Error!");
            }
            else {
                console.log(`Fields:\n`);
                console.log(fields);
                console.log(`\nFiles:\n`);
                console.log(files);
                res.statusCode = 200;
                res.end("Upload succeeded!");
            }
        })
    } else {
        fs.createReadStream("./index.html").pipe(res);
    }


});


server.listen(2131);