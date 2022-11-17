const axios = require("axios");
const { ethers } = require("ethers");
const { ABI } = require("./abi");
const express = require("express");
const app = express();
const contractAddress = "0x64D1eE237c1633044b812F0a618a9171D7d2A803";

const provider = new ethers.providers.WebSocketProvider(
  "wss://polygon-mumbai.g.alchemy.com/v2/KM1Kv-cqY7LlaPsoximQwOASxTzExuR5"
);

const contract = new ethers.Contract(contractAddress, ABI, provider);

contract.on("Liquidation", async (user, price, amountMATIC, amountDAI) => {
  const date = new Date();
  const time =
    date.toLocaleString("en-GB", { timeZone: "Europe/London" }) + " (UTC + 0)";

  const address = user.toLowerCase();
  const sender = contractAddress;
  const info = {
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

  const result = await axios.post("https://liqui.onrender.com/api/ipfs", info);

  console.log(result);
});

contract.on("Deposit", (user, token, amount, balance) => {
  const data = {
    user,
    token,
    amount,
    balance,
  };

  console.log(JSON.stringify(data));
});

const port = 8081;
app.listen(
  process.env.PORT || port,
  console.log(`Listening on port ${port}...`)
);
