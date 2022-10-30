import exp from 'constants'
import express from 'express'
import { data } from './data'

const app = express()
app.use(express.json())
const PORT = 5000

app.get('/tasks', (req, res) => {
    console.log(req.method, req.url);
    res.status(200).json()
})

app.post('/tasks', (req, res) => {
    console.log(req.method, req.url);
    res.status(200).json()
})

app.put('/tasks/:id', (req, res) => {
    console.log(req.method, req.url);
    res.status(200).json()
})

app.delete('/tasks/:id', (req, res) => {
    console.log(req.method, req.url);
    res.status(200).json()
})

app.listen(PORT, () => {
    console.log(`~ Server is running on port ${PORT}`);
})