import { buildRoutePath } from '../utils/build-route-path.ts'
import { TaskController } from '../controllers/TaskController.ts'
import { Route } from '../server.ts'

const controller = new TaskController

export const taskRoutes: Route[] = [
    {
        method: 'POST', 
        path: buildRoutePath('/tasks'),
        handler: controller.create
    },
    {
        method: 'GET', 
        path: buildRoutePath('/tasks'),
        handler: controller.listAll
    },
    {
        method: 'PUT', 
        path: buildRoutePath('/tasks/:id'),
        handler: controller.update
    },
    {
        method: 'DELETE', 
        path: buildRoutePath('/tasks/:id'),
        handler: controller.delete
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: controller.completedTask
    }
] 