'use strict';
const express = require('express');
const router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

request('https://en.wikipedia.org/wiki/Frenkie_de_Jong', function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          console.log($("#firstHeading").outerHTML); 
      }
});

module.exports = router;
