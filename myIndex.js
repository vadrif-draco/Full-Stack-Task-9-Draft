const { read, write } = require("./6_Storage/myFS");
// console.log(`\nprocess.argv: ${process.argv}\n`);

function Greet(name) {

    if (!name)
        throw new Error("No name provided!");

    let messages = [
        `Welcome, Mr. ${name}\n`,
        `Good morning, Mr. ${name}\n`,
        `Good afternoon, Mr. ${name}\n`,
        `Good night, Mr. ${name}\n`,
        `Good day, Mr. ${name}\n`,
        `Hey, Mr. ${name}\n`,
        `Hi, Mr. ${name}\n`,
    ]

    let num;
    while ((num = Random()) >= messages.length);
    console.log(`\nInside Greet function: ${messages[num]}\n`);
    return messages[num];
}

function Random() { return Math.round(Math.random() * 10); }

async function test_storage() {

    if (process.argv.length > 2) {

        // Greet first arg and truncate (by default)
        await write("file.txt", Greet(process.argv[2]))

        // Then greet everybody afterwards by appending
        for (let i = 3; i < process.argv.length; i++) {
            await write("file.txt", Greet(process.argv[i]), "append")
        }

        // Then read back
        read("file.txt").then((value) => console.log(value))
    }
}

test_storage()

module.exports = { Greet }