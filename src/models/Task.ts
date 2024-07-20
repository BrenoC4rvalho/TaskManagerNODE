import { randomUUID, UUID } from "crypto"
import { Database, DatabaseRow } from "../database/database.ts"

const database = new Database()

export interface TaskType {
    id: UUID
    title: string
    description: string
    completed_at: null | Date
    created_at: Date
    updated_at: Date
}

export class Task {
    #id: UUID
    #title: string
    #description: string
    #completed_at: null | Date
    #created_at: Date
    #updated_at: Date

    constructor(title: string, description: string) {
        this.#id =  randomUUID()
        this.#title = title
        this.#description = description
        this.#completed_at = null
        this.#created_at = new Date()
        this.#updated_at = new Date()
    }

    save() {
        database.insert('tasks', {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            completed_at: this.#completed_at,
            created_at: this.#created_at,
            updated_at: this.#updated_at
        })
    }

    static findAll(search: string) {
        return database.select('tasks',{
            title: search,
            description: search
        })
    }

    static findById(id: any) {
        return database.select('tasks', {'id': id})
    }

    static update(id: any, data: Partial<DatabaseRow>) {
        database.update('tasks', id, data)
    }

    static delete(id: any) {
        database.delete('tasks', id)
    }

    static completed (id: any) {
        console.log(id)
        database.update('tasks', id, {
            "completed_at": new Date()
        })
    }

}