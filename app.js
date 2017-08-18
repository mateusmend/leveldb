var express = require('express');
var bodyParser = require('body-parser');

var levelup = require('levelup');
var db = levelup('./banco');

var app = express();

app.use(bodyParser.json());
db.open();

app.get("/",(req, res) => {
    db.isOpen() ? res.send("Banco conectado") : res.send("Banco não conectado");
})
var ops = [{type: 'put',value: { some: 'json' },valueEncoding: 'json'}]
app.post("/api", (req, res) => {
    db.put(parseInt(req.query.id),RetornarJson(req.body),ops,function(err) {
        if(err) return res.send(err.message);
        res.send("Registro inserido");
    });
})
app.get("/api", (req, res) => {
    db.get(parseInt(req.query.id), (err,value) => {
        if(err) return res.send(err.message);
        res.type('json');
        res.send(value);
    })
});

app.listen(8080, x => {
    console.log("Aplicação em execução !");
})

function RetornarJson(request) {
    return JSON.stringify(request);
}
