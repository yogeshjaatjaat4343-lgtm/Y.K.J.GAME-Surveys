const express = require("express");
const app = express();

let users = {};

app.get("/", (req,res)=>{
    res.send("Backend running");
});

app.get("/user/:id", (req,res)=>{
    res.json({ coins: users[req.params.id] || 0 });
});

app.get("/callback", (req,res)=>{
    let user = req.query.user_id;
    let reward = parseFloat(req.query.reward) || 0;

    let coins = Math.floor(reward * 100 * 0.5);

    if(!users[user]) users[user] = 0;

    users[user] += coins;

    res.send("OK");
});
app.listen(process.env.PORT || 3000);
app.get("/postback", (req, res) => {
    const userId = req.query.user_id;
    const amount = req.query.amount || 0;

    console.log(userId, amount);

    res.send("OK");
});
