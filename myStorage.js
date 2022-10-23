const { readFile, writeFile, appendFile } = require('fs').promises;

function read(path) { return readFile(path, "utf-8"); }

function write(path, content, mode = "truncate") {

    switch (mode) {

        case "truncate": // default if mode unspecified
            return writeFile(path, content);

        case "append":
        default:
            return appendFile(path, content);

    }

}

module.exports = { read, write }