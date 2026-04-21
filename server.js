const express = require("express");
const app = express();

app.use(express.json());

let users = {};

// Home route
app.get("/", (req, res) => {
    res.send("Backend running");
});

// Get user coins
app.get("/user/:id", (req, res) => {
    res.json({ coins: users[req.params.id] || 0 });
});

// 🔥 OGAds Postback
app.get("/postback", (req, res) => {

    let user = req.query.user_id;
    let reward = parseFloat(req.query.payout || 0);

    if (!user || !reward) {
        console.log("Ignored:", req.query);
        return res.send("Ignored");
    }

    console.log("POSTBACK:", user, reward);

    let coins = Math.floor(reward * 100 * 0.6);

    if (!users[user]) users[user] = 0;

    users[user] += coins;

    console.log("TOTAL COINS:", users[user]);

    res.send("OK");
});

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});
