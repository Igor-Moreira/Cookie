const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

//diretório onde estára os views
app.set('views', path.join(__dirname, 'views'))
//defini ejs como templete engine
app.set('view engine', 'ejs')

//mostrar todas as contas criadas
app.get('/', (req, res)=> {
    let contas = []
    if('contas' in req.cookies){
        contas = req.cookies.contas
    }
    res.render('index', {
        contas
    })
})
//lista
app.post('/calc', (req,res) => {
    let {num1, num2, op} = req.body
    num1 = parseInt(num1)
    num2 = parseInt(num2)
    let total = 0
    if(op === '+'){
        total = num1 + num2
    }else if(op === '-'){
        total = num1 - num2
    }else if (op === '*'){
        total = num1 * num2
    }else if (op === '/'){
        total = num1 / num2
    }
    let contas = []
    if('contas' in req.cookies){
        contas = req.cookies['contas']
    }
    contas.push({
        num1, num2, op, total
    })
    res.cookie('contas', contas, {maxAge: 20000})
    res.redirect('/')
})

app.listen(port, () => console.log('running!'))

