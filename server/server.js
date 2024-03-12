const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db')
const cors = require('cors')

const app = express();
const port = 3000
app.use(cors());

app.use(express.json())
app.post('/register', async (req, res) => {
    const { name, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        await db.query('INSERT INTO login (name, password) VALUES (?,?)', [name, hashPassword])
        res.status(201).send('user registered successfully')
    } catch (error) {
        console.error('database error:', error);
        res.status(500).send('internal server error')
    }
})
app.get('/',(req, res)=>{
    res.send('fgf fbv')
})
app.listen(port, (req, res) => {
    console.log(` listening on ${port}`)
})
