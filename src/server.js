/* eslint-env node */

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/../public'));

app.listen(app.get('port'), function() {
    console.log("Server running at http://localhost:" + app.get('port'));
});