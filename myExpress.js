const express = require('express')
const { Greet } = require("./myIndex");
const { read, write } = require("./myStorage");

const app = express();

app.use(express.json())

app.get('/', function (req, res) {
    res.send(Greet('Guest'));
})

app.get("/users", (req, res) => {
    read("users.json").then((value) => res.json(JSON.parse(value || "[]")), (err) => console.log(err))
})

app.post("/users/", (req, res) => {
    let newUser = req.body
    if (newUser) {
        read("users.json").then((users) => {
            users = JSON.parse(users || "[]")
            newUser.id = 1 + Math.max(0, ...users.map((user) => { return user.id }));
            users.push(newUser)
            write("users.json", JSON.stringify(users))
            // No better way to append to JSON file instead of re-writing every time?
            res.json({ message: `User added successfully with id ${newUser.id}` })
        })
    }
})


app.get("/users/:id", (req, res) => {
    read("users.json").then((users) => {
        users = JSON.parse(users || "[]")
        res.json(users.find((user) => { return user.id == req.params['id'] }) ?? "User not found")
    })
})

app.delete("/users/:id", (req, res) => {
    read("users.json").then((users) => {
        users = JSON.parse(users || "[]")
        let index = users.findIndex((user) => { return user.id == req.params['id'] })
        if (index != -1) {
            // Remove user by id
            users.splice(index, 1)
            // Shift all users ids afterwards
            // for (let i = index; i < users.length; i++) users[i].id--
            // Doesn't make sense to change IDs though...
            write("users.json", JSON.stringify(users))
            res.json({ message: `User with id ${req.params['id']} deleted successfully` })
        }
    })
})

app.listen(3000);
// app.listen(80);