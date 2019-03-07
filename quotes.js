const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.text({type: "*/*"}));

app.post("/", function(req, res) {

    var text = "";
    var author = "";
    request('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        console.log(body.quoteText);
        console.log(body.quoteAuthor);
        text = body.quoteText;
        author = body.quoteAuthor;
        if (text === undefined) {
            setInterval(function() {
                res.end();
            }, 10000); // don't return anything, fallback 
        } else {
            res.send(text + "  -" + author);
        }
    });

});

const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Server started on port", port);
});