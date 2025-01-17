// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req,res) =>{
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date(parseInt(new Date().getTime())).toUTCString()
  });
});

app.get("/api/:date?", (req,res) =>{
  const date = req.params.date;
  if (typeof(parseInt(date)) === "number" && date.length === 13){
    res.json({
      "unix": parseInt(date),
      "utc": new Date(parseInt(date)).toUTCString()
    });
  }else if (new Date (parseInt(date)).toUTCString() !== "Invalid Date"){
    res.json({
      "unix": new Date(date).getTime(),
      "utc": new Date(parseInt(new Date(date).getTime())).toUTCString()
    })
  }else{
    res.json({
      "error": "Invalid Date"
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
