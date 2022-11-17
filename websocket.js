const axios = require("axios");
const { ethers } = require("ethers");
const { ABI } = require("./abi");
const express = require("express");
const app = express();
const main = async () => {
  const contractAddress = "0x64D1eE237c1633044b812F0a618a9171D7d2A803";

  const provider = new ethers.providers.WebSocketProvider(
    "wss://polygon-mumbai.g.alchemy.com/v2/KM1Kv-cqY7LlaPsoximQwOASxTzExuR5"
  );

  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const _id = Math.random() * 100000000;
  contract.on("Liquidation", async (user, price, amountMATIC, amountDAI) => {
    const time =
      date.toLocaleString("en-GB", { timeZone: "Europe/London" }) +
      " (UTC + 0)";
    const address = user.toLowerCase();
    const sender = contractAddress;
    const info = {
      _id,
      address,
      sender,
      price: ethers.utils.formatEther(price.toString()),
      receiver: address,
      amountMATIC: ethers.utils.formatEther(amountMATIC.toString()),
      amount: ethers.utils.formatEther(amountDAI.toString()),
      time,
      method: "Liquidate",
      token: "DAI",
    };
    console.log(info);
    try {
      const result = await axios.post(
        "https://liqui.onrender.com/api/ipfs",
        info
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }

    console.log(result);
  });
};

main()
  .then()
  .catch((e) => console.log(e));

const port = 8081;
app.listen(port, console.log(`Listening on port ${port}...`));
