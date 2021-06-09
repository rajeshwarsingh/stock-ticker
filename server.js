const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();
const {ALPHA_VANTAGE_API_KEY='', PORT='', HOST=''} = require('./config')

const cors = require("cors");
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const timePeriod = require("./constants");

app.get("/",(req, res)=>{
  res.send("Use /stock route to get the stock ticker prices")
})

// ROUTE FOR STOCK PRICE DETAILS
app.post("/stock", cors(), async (req, res) => {
  const body = JSON.parse(JSON.stringify(req.body));
  const { ticker="", type="daily" } = body;

  if(!ticker){
    res.status(404);
    return res.send({ error: "Please provide stock name ie. AAPL" });
  }
  
  const request = await fetch(
    `https://www.alphavantage.co/query?function=${timePeriod(
      type
    )}&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const data = await request.json();
  res.json({ data: data });
});

// START SERVER
app.listen(PORT, HOST, ()=>{
  console.log(`Service running on http://${HOST}:${PORT}`);
});
