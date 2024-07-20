import { IncomingMessage, ServerResponse } from 'node:http'
import { Task } from '../models/Task.ts';


export class TaskController {

    create(req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) {
           const { title, description } = req.body

           if (!title) {
                return res.writeHead(400).end(
                    JSON.stringify({ message: 'Title is required.' })
                )
            }

           if (!description) {
                return res.writeHead(400).end(
                    JSON.stringify({ message: 'Description is required.' })
                )
            }
 

            const task = new Task(title, description)

            task.save()

            return res.writeHead(201).end({ message: 'Task created successfully.' })
        

    }

    listAll(req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) {
        const { search } = req.query

        const tasks = Task.findAll(search)

        if(!tasks) return res.writeHead(404).end({ message: 'No tasks found.' }  )

        return res.writeHead(200).end(JSON.stringify(tasks))
    }

    update(req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) {
        const { id } = req.params
        const { title, description} = req.body

        if(title && description) {
            const task = Task.findById(id)

            if (!task) return res.writeHead(404).end({ message: 'Task not found.' })
        
            Task.update(id, {
                title, 
                description, 
                'updated_at': new Date
            })
        
                return res.writeHead(204).end({ message: 'Task edited successfully.' })
                
        }

        return res.writeHead(400).end(
            JSON.stringify({ message: 'Title and description are required' })
        )

    }

    delete(req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) {
        const { id } = req.params

        const task = Task.findById(id)
    
        if(!task) return res.writeHead(404).end({ message: 'Task not found.'  })

        Task.delete(id)

        return res.writeHead(204).end({ message: 'Task deleted successfully.' })    
    }

    completedTask(req: IncomingMessage & { params?: any; query?: any; body?: any }, res: ServerResponse) {
        const { id } = req.params
        const task = Task.findById(id)

        if(!task) return res.writeHead(404).end({ message: 'Task not found.'  })


        Task.completed(id)

        return res.writeHead(204).end({ message: 'Task completed successfully.'  })
    }
    
    
}