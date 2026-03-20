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

// ==========================================================
// DIA 4: 23/03 - ENTRADA DE DADOS E FILTROS DINÂMICOS
// ==========================================================

// ROTA ESPECÍFICA: Busca apenas UM incidente pelo número do ID
app.get('/incidentes/:id', async (req, res) => {
    // req.params pega o número que o usuário digitou na URL (ex: /incidentes/2)
    const { id } = req.params 
    
    const db = await criarBanco()
    
    // O '?' é um espaço reservado que será preenchido pelo valor da variável [id]
    // Isso garante segurança contra ataques (SQL Injection)
    const incidenteEspecifico = await db.all(`SELECT * FROM incidentes WHERE id = ?`, [id])
    
    res.json(incidenteEspecifico)
})

// ROTA POST: Define uma rota do tipo POST para o endpoint '/incidentes'
app.post('/incidentes', async (req, res) => {
    // Desestrutura os dados enviados no corpo da requisição (JSON) para variáveis individuais
    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema} = req.body

    // Abre a conexão com o banco de dados (função assíncrona)
    const db = await criarBanco()
    // Executa o comando SQL para inserir os dados na tabela 'incidentes'
    // O uso de '?' previne SQL Injection, garantindo que os dados sejam tratados apenas como valores
    await db.run(`INSERT INTO incidentes (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema])

    // Envia uma resposta de confirmação para o cliente que fez a requisição
    res.send(`Incidente novo registrado: ${tipo_problema} registrado na data ${data_registro} por ${nome_solicitante}.`)
})
