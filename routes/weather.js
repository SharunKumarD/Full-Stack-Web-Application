const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.github.com/users/octocat"
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            message: "External API Error"
        });

    }
});

module.exports = router;