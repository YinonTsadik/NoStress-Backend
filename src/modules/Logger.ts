import { Request, Response, NextFunction } from 'express'

export default function logger(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const method = req.method
    const url = req.url
    const time = new Date().toLocaleString()
    console.log(method, url, time)
    next()
}
