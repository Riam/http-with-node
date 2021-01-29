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
            maxFileSize: 51 * 1024 * 1024, // 5 megs
            multiples: true
        });

        form.parse(req)
            .on('fileBegin', (name, file) => {
                console.log('Our upload has started!');
            })
            .on('file', (name, file) => {
                console.log('Field + file pair has been received');
            })
            .on('field', (name, value) => {
                console.log('Field received:');
                console.log(name, value);
            })
            .on('progress', (bytesReceived, bytesExpected) => {
                console.log(bytesReceived + ' / ' + bytesExpected);
            })
            .on('error', (err) => {
                console.error(err);
                // paused automatically on error, manually resume
                req.resume();
            })
            .on('aborted', () => {
                console.error('Request aborted by the user!');
            })
            .on('end', () => {
                console.log('Done - request fully received!');
                res.end('Success!');
            });
    } else {
        fs.createReadStream("./index.html").pipe(res);
    }


});


server.listen(2131);