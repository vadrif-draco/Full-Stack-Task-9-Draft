const http = require("http")

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("HOMEPAGE");
        res.end();
    } else if (req.url === "/about" && req.method === "GET") {
        res.write("ABOUT");
        res.end();
    } else {
        res.write("NOT FOUND")
        res.end();
    }
})

server.listen(5051);