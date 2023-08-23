const connection = require('./db.js')

connection.connect((err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("conectado ao banco")
    }
})

let sql = 'CREATE TABLE IF NOT EXISTS pessoas (_id int AUTO_INCREMENT, nome varchar(100), cpf varchar(11), dataNasc varchar(10), email varchar(70), PRIMARY KEY(_id))'
    connection.query(sql, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("tabela criada")
        }
    })

    let pessoa = {
        nome: 'jessica',
        cpf: '14512365498',
        dataNasc: '22/04/2004',
        email: 'jegelsdorf@gmail.com'
    }

    sql = 'INSERT INTO pessoas SET ?'
    connection.query(sql, pessoa, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("pessoa gravado")
        }
    })

    
    // const pessoa1 = new Pessoa({
    //     nome: 'pessoa1',
    //     cpf: '123',
    //     dataNasc: 'xxx',
    //     email: 'email'
    // })

    // const pessoa2 = new Pessoa({
    //     nome: 'pessoa2',
    //     cpf: '123',
    //     dataNasc: 'xxx',
    //     email: 'email'
    // })

    // const pessoa3 = new Pessoa({
    //     nome: 'pessoa3',
    //     cpf: '123',
    //     dataNasc: 'xxx',
    //     email: 'email'
    // })

    // Pessoa.insertMany([pessoa1, pessoa2, pessoa3])
    //     .then(res => console.log(res))
    //     .catch(e => console.log(e))