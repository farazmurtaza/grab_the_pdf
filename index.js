const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const phantom = require("phantom");
const fs = require("fs");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.use(express.static(path.join(__dirname)));
app.use(cors());
const port = 5001;

app.use(bodyParser.json());

app.post("/generate_pdf", async (req, res) => {
  console.log(req.body.url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(req.body.url, {
    waitUntil: "networkidle2"
  });
  await page.setViewport({ width: 1680, height: 1050 });
  const name = new Date();
  const pdfPath = path.join(__dirname, "files", name.getTime() + ".pdf");

  const pdf = await page.pdf({
    path: pdfPath,
    //format: "A4",
    printBackground: true
  });
  await browser.close();
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length
  });
  res.sendFile(pdfPath);
});

app.listen(port, () => {
  console.log("Server started at port " + port);
});
module.exports = app;
