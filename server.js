const express = require("express");
const app = express();

let users = {};

app.get("/", (req,res)=>{
    res.send("Backend running");
});

app.get("/user/:id", (req,res)=>{
    res.json({ coins: users[req.params.id] || 0 });
});

/* ❌ OLD callback (confusing + unused)
app.get("/callback", (req,res)=>{
    let user = req.query.user_id;
    let reward = parseFloat(req.query.reward) || 0;

    let coins = Math.floor(reward * 100 * 0.5);

    if(!users[user]) users[user] = 0;

    users[user] += coins;

    res.send("OK");
});
*/

// ✅ FIXED POSTBACK (MAIN FIX)
app.get("/postback", (req, res) => {

    let user = req.query.user_id;

    // FIX: multiple parameter support (CPX/Timewall different names use करते हैं)
    let reward = parseFloat(
        req.query.reward ||
        req.query.amount ||
        req.query.points ||
        req.query.payout ||
        0
    );

    console.log("POSTBACK:", user, reward);

    // 50% logic (as you wanted)
    let coins = Math.floor(reward * 100 * 0.5);

    if(!users[user]) users[user] = 0;

    users[user] += coins;

    console.log("TOTAL COINS:", users[user]);

    res.send("OK");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
