import http, { IncomingMessage, ServerResponse } from 'node:http'

import { taskRoutes } from './routes/task.routes.ts'
import { json } from './middlewares/json.ts'
import { extractQueryParams } from './utils/extract-query-params.ts'

const port = 3000

export interface Route {
    method: string
    path: RegExp
    handler: (req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) => void
}

const routes: Route[] = taskRoutes

const server = http.createServer(async (req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) => {
    const { method, url } = req

    if (!url) return res.writeHead(404).end({ message: 'URL is required.'  })

    await json(req, res)
    
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(!route) return res.writeHead(404).end({ message: 'Route not found.'  })
    
    const routeParams = url.match(route.path)

    if(routeParams && routeParams.groups) {
        const { query, ...params } = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query) : {}
    } else {
        req.params = {}
        req.query = {}
    }

    return route.handler(req, res)
})

server.listen(port , () => {
    console.log(`Server is running on port ${port}`)
}) 