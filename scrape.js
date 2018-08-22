const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const fs = require('fs');
const axios = require("axios");
const cheerio = require('cheerio')
const mongoose = require("mongoose");
const moment = require('moment'); 
const db = require("./models");
const transactionScrape = require("./transactionHistoryScrape"); 
const customerScrape = require("./customerListScrape"); 

const PORT = 8080;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// This will connect to mLab 
mongoose.connect("mongodb://localhost/intoTheGrowHaus");

// Make sure that data does not already exist in the DB 

app.get("/scrape", function(req, res) {

    fs.readFile('./reports/CustomersReport.html', function (err, data) {

        const $ = cheerio.load(data);

        // Capture transaction report title
        const transReportTitle = $('html').children('body').children('div').eq(0).children('span').children('strong').html().trim();
        console.log("Transaction Report Title: ", transReportTitle
        ); 

        // Capture customer report title
        const customerReportTitle = $('html').children('body').children('div').eq(0).children('span').children('strong').html().trim(); 
        console.log("Customer Report Title: ", customerReportTitle);

        // Fire the appropriate scrapper 
        if (transReportTitle === "AccuPOS Transaction History") {
            transactionScrape($, db);
        } 
        
        if (customerReportTitle === "Customers List Report") {
            customerScrape();
        }

    })

})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

axios.get("http://localhost:8080/scrape").then(res => console.log("Scrape route hit.")); 

