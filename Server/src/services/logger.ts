import { Request, Response, NextFunction } from 'express'

function logger(req: Request, res: Response, next: NextFunction) {
    const method = req.method
    const url = req.url
    const time = new Date().toLocaleString()
    console.log(method, url, time)
    next()
}

export { logger }
