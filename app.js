const express = require("express");
const app = express();
const methodOverride = require("method-override");
const connection = require('./db.js');

app.set("view engine", "ejs");
app.set('views', './views');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('./public'))
const router = express.Router();

connection.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("conectado ao banco")
    }
})

//validação de input
router.get('/', function(req, res, next) {
    res.json([]);
  });
  
  router.post('/', (request, response) => {
    response.json(request.body);
  })
//

app.get("/", (req, res) => {
    res.redirect("/pessoas")
})

app.get("/pessoas", (req, res) => {
    const sql = 'SELECT * FROM pessoas'
    connection.query(sql, (err, pessoas) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {pessoas})
        }
    })
})

app.get("/pessoas/new", (req, res) => {
    res.render("new")
})

app.post("/pessoas", (req, res) => {
    sql = 'INSERT INTO pessoas SET ?'
    req.body.nome != ""
    req.body.email != ""
    req.body.cpf != ""
    req.body.dataNasc != ""
    connection.query(sql, req.body, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("pessoa gravada")
        }
    })
    res.redirect('/pessoas')
})

app.get("/pessoas/:id", (req, res) => {
    const {id} = req.params
    const sql = 'SELECT * FROM pessoas WHERE _id = ?'
    connection.query(sql, id, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log(res.render('show', {pessoa: result[0]}))
        }
    })
})

app.get("/pessoas/:id/edit", async (req, res) => {
    const {id} = req.params
    const sql = 'SELECT * FROM pessoas WHERE _id = ?'
    connection.query(sql, id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            (res.render('edit', {pessoa: result[0]}))
        }
    })
    
})

app.patch("/pessoas/:id", async (req, res) => {
    const {id} = req.params
    const sql = 'UPDATE pessoas SET ? WHERE _id = ?'
    connection.query(sql, [req.body, id], (err) => {
        if (err) {
            console.log (err)
        } else {
            res.redirect('/pessoas/'+id)
        }
    })
})

app.delete('/pessoas/:id', (req, res) => {
    const {id} = req.params
    const sql = 'DELETE FROM pessoas WHERE _id = ?'
    connection.query(sql, id, (err) => {
        if (err){
            console.log(err)
        } else {
            res.redirect('/pessoas')
        }
    })
})

app.listen(3000, () => {
    console.log("servidor ligado na porta 3000")
})