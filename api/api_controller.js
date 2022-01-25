const axios = require("axios");
const rand = require("random-seed").create();
require("dotenv").config();

const wheelInfos = {
    1: 0,
    2: 3,
    3: 0,
    4: 0,
    5: 1,
    6: 2,
    7: 0,
    8: 3,
    9: 0,
    10: 2,
    11: 0,
    12: 1,
}

const getRandomAngle = (e) => {
    e.R_angle = rand.intBetween(1, 12);
}

const getWinMoney = (e) => {
    e.winAmount = wheelInfos[e.R_angle] * e.bet;
}

module.exports = {
    MainStart: async (req, res) => {
        try {
            const { token, betAmount } = req.body;
            try {
                await axios.post(
                    process.env.PLATFORM_SERVER + "api/games/bet",
                    {
                        token: token,
                        amount: betAmount,
                    }
                );
            } catch (err) {
                throw new Error("1");
            }

            let user = {};
            user.bet = betAmount;
            await getRandomAngle(user);
            await getWinMoney(user);
            try {
                await axios.post(
                    process.env.PLATFORM_SERVER + "api/games/winlose",
                    {
                        token: token,
                        amount: user.winAmount,
                        winState: user.winAmount != 0 ? true : false,
                    }
                );
            } catch {
                console.log(2);
                throw new Error("2");
            }
            try {
                res.json({
                    Angle: user.R_angle,
                    WinMoney: user.winAmount,
                    Message: "3"
                })
            } catch {
                throw new Error("Front end is killed");
            }
        } catch (err) {
            res.json({
                Angle: 0,
                WinMoney: 0,
                Message: err.message
            });
        }
    },
};
