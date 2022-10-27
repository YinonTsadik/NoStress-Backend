import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.end("Hello");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});