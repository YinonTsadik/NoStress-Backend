import express from 'express'
import { knapsack } from './data'

const app = express()
const PORT = 5000

app.get('/', (req, res) => {
    console.log(req.method, req.url);
    res.end();
})

app.listen(PORT, () => {
    console.log(`~ Server is running on port ${PORT}`);
})