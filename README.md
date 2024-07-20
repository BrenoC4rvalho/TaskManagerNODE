# HTTP Server (TaskManager)

## ⌨️ Sobre o Projeto

Este projeto consiste em uma API criada utilizando [Node.js](https://nodejs.org/) sem a utilização de frameworks, apenas com o módulo HTTP nativo do Node.js. Na parte de streams, é possível importar um arquivo CSV para a API.

## 🛠️ Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

## 🚀 Rodar o Projeto

Primeiramente, é necessário ter o Node.js instalado. Caso não tenha, faça a instalação [aqui](https://nodejs.org/en/download/).

Após instalar as dependências, execute o comando abaixo para rodar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para acessar o servidor.

## 📄 Importar Arquivo CSV

Com o servidor rodando, execute o comando abaixo para enviar o arquivo `tasks.csv` para o servidor:

```bash
npm run import-csv
```

## 📚 Endpoints da API

- **GET** `/tasks` - Retorna todas as tasks
- **POST** `/tasks` - Cria uma nova task
- **PUT** `/tasks/{id}` - Edita uma task existente
- **DELETE** `/tasks/{id}` - Exclui uma task
- **PATCH** `/tasks/{id}/complete` - Marca uma task como completada

## 🧑‍💻 Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
