// ==========================================================
// DIA 3: 20/03 - INTEGRANDO SQLITE COM EXPRESS
// ==========================================================

// IMPORTAÇÕES: Trazendo as ferramentas necessárias
const express = require('express') // O Framework que cria o servidor e as rotas
const { criarBanco } = require('./database') // A nossa "chave" que abre a conexão com o banco de dados

// INICIALIZAÇÃO: Ligando o motor do servidor
const app = express()

// TRADUTOR: Configura o Express para entender dados enviados no formato JSON
app.use(express.json())

// ROTA RAIZ: A porta de entrada principal (localhost:3000)
// Enviamos um HTML simples para o navegador não ficar em branco
app.get('/', (req, res) => {
    res.send(`
        <body>
            <h1>ZelaCidade</h1>
            <h2>Gestão de Problemas Urbanos</h2>
            <p>Endpoint que leva aos incidentes cadastrados: /incidentes</p>
        </body>
    `)
})

// Define a porta onde o servidor vai rodar
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})

// ROTA DE LISTAGEM: Busca todos os problemas registrados
app.get('/incidentes', async (req, res) => {
    const db = await criarBanco() // Abre a conexão com o banco
    // SELECIONE/BUSQUE TUDO(*) DA TABELA incidentes
    const listaIncidentes = await db.all(`SELECT * FROM incidentes`) // .all() scaneia a tabela e traz uma LISTA (Array) com tudo o que encontrar
    res.json(listaIncidentes) // Entrega a bandeja de dados para o cliente
})
