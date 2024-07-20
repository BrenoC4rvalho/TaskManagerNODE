import { IncomingMessage, ServerResponse } from 'http'

export async function json(req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    res.setHeader('Content-type', 'aplication/json')
}