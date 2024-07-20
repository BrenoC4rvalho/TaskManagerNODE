import fs from 'node:fs/promises'

const databasePath = new URL('../../tmp/db.json', import.meta.url)

export interface DatabaseRow {
  id: string 
  [key: string]: any
}

interface DatabaseSchema {
  [key: string]: DatabaseRow[]
}

export class Database {
  #database: DatabaseSchema = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2))
  }

  select(table: string, search?: Partial<DatabaseRow>): DatabaseRow[] {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          if (!value) return true
          return row[key].includes(value)
        })
      })
    }

    return data
  }

  insert(table: string, data: DatabaseRow): DatabaseRow {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table: string, id: string, data: Partial<DatabaseRow>) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      const row = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = { ...row, ...data, id }
      this.#persist()
    }
  }

  delete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}
