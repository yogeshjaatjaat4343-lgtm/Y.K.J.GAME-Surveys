app.get("/postback", (req, res) => {

    let user = req.query.user_id;

    // 🔥 ONLY OGAds payout parameter use करो
    let reward = parseFloat(req.query.payout || 0);

    // ❌ अगर payout नहीं आया → ignore
    if(!user || !reward){
        console.log("Ignored (not OGAds):", req.query);
        return res.send("Ignored");
    }

    console.log("OGAds POSTBACK:", user, reward);

    let coins = Math.floor(reward * 100 * 0.6); // 60% user share

    if(!users[user]) users[user] = 0;

    users[user] += coins;

    console.log("TOTAL COINS:", users[user]);

    res.send("OK");
});
