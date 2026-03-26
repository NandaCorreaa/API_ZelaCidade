# 🏙️ API ZelaCidade

A **ZelaCidade** é uma API para gerenciamento de ocorrências urbanas, onde cidadãos podem registrar problemas da cidade.

Ela permite criar, visualizar, atualizar e deletar ocorrências.

## 🛠️ Tecnologias
- Node.js
- Express
- SQLite
- Nodemon

## 📦 Instalação

```bash
npm install
```

## ▶️ Como Executar

```bash
npm run dev
```
### Servidor disponível em:
http://localhost:3000

## 🗄️ Banco de Dados
O banco é criado automaticamente ao iniciar o projeto:

```
database.db
```

### 📋 Tabela: `incidentes` 

| Campo               | Descrição                 |
| ------------------- | ------------------------- |
| id                  | Identificador único       |
| tipo_problema       | Tipo do problema          |
| localizacao         | Onde ocorreu              |
| descricao           | Detalhes                  |
| prioridade          | Baixa, Média ou Alta      |
| nome_solicitante    | Quem registrou            |
| contato_solicitante | Contato                   |
| data_registro       | Data do registro          |
| hora_registro       | Hora do registro          |
| status_resolucao    | Status (padrão: Pendente) |
| imagem_problema     | URL da imagem             |

---
## 🌱 Dados iniciais (Seed)
Se o banco estiver vazio, o sistema insere automaticamente registros de exemplo.
👉 Isso facilita os testes da API

---
## 🔗 Rotas da API

### 🏠 Rota inicial

```http
GET /
```
Retorna uma página HTML simples com informações da API.

### 📄 Listar todos os incidentes

```http
GET /incidentes
```
Retorna todos os registros do banco.

### 🔍 Buscar incidente por ID

```http
GET /incidentes/:id
```
Exemplo:
```
/incidentes/1
```
---
### ➕ Criar novo incidente

```http
POST /incidentes
```
#### Body (JSON):
```json
{
  "tipo_problema": "Buraco na rua",
  "localizacao": "Rua A",
  "descricao": "Buraco grande",
  "prioridade": "Alta",
  "nome_solicitante": "João",
  "contato_solicitante": "99999-9999",
  "data_registro": "2026-03-24",
  "hora_registro": "14:00",
  "imagem_problema": "url_da_imagem"
}
```
---
### ✏️ Atualizar incidente

```http
PUT /incidentes/:id
```
#### Body (JSON):

```json
{
  "prioridade": "Média",
  "descricao": "Atualização do problema",
  "status_resolucao": "Em análise"
}
```
---
### ❌ Deletar incidente

```http
DELETE /incidentes/:id
```
---
## 🔐 Segurança

A API utiliza `?` nas queries SQL:
```sql
WHERE id = ?
```
👉 Isso evita SQL Injection

---

## 📚 Conceitos utilizados
- CRUD (Create, Read, Update, Delete)
- Rotas com Express
- Métodos HTTP (GET, POST, PUT, DELETE)
- Banco de dados SQLite
- SQL básico
- Uso de `req.params` e `req.body`
---

## 🎯 Observações
- O banco é criado automaticamente
- Dados iniciais são inseridos apenas se estiver vazio
- A API pode ser testada com Postman
---
## 👩‍💻 Projeto educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js 🚀

