const fs = require("fs");
const axios = require("axios");

// basic axios example
// axios.get("http://www.intrado.com")
//     .then((response) => {
//         console.log(response.data);
//     }).catch((err) => {
//         console.log(err);
//     });

// with options set to use a stream
// axios({
//     method: "get",
//     url: "http://www.intrado.com",
//     responseType: "stream"
//     })
//     .then((response) => {
//         response.data.pipe(fs.createWriteStream("intrado.html"));
//     }).catch((err) => {
//         console.log(err);
//     });

// example using a function to transform the payload
axios({
    method: "post",
    url: "http://localhost:2131/users",
    data: {
        userName: "fillibilli"
    },
    transformRequest: (data, headers) => {
        const newData = {
            userName: data.userName + "!"
        }
        return JSON.stringify(newData);
    }
})
    .then((response) => {
        // response.data.pipe(fs.createWriteStream("intrado.html"));
    }).catch((err) => {
        console.log(err);
    });