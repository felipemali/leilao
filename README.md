# Sistema de Leilões em Tempo Real

Este repositório contém uma aplicação completa de **leilões em tempo real**, composta por **três projetos integrados**:

- **Auctioneer** → Interface para administradores criarem e gerenciarem leilões.
- **User Front-End** → Interface para usuários acompanharem e participarem dos leilões.
- **Auctions API** → API e servidor WebSocket que gerencia os leilões, lances e persistência dos dados.

<br>
<br>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

---

### 🏗️ Estrutura do Repositório

```
leilao/
├── auctioneer/ # Frontend para administradores
├── user-front-end/ # Frontend para usuários
└── auctions-api/ # Backend (API + WebSocket)
```

---

## 🖥️ **Auctioneer (Frontend Admin)**

- Interface para criação e gerenciamento de leilões.

## 🛠️ Tecnologias

- **Typescript 5.6.2** - Linguagem
- **React 18.3.1** - Biblioteca base
- **Vite 6.0.5** - Ferramenta de build
- **Tailwind 3.4.11** - Estilização
- **WebSocket** - Comunicação
- **Outros:** Hooks customizados, tipagem forte com Models/Types

## 🚀 Funcionalidades

- **Criar novos leilões**
- **Acompanhar detalhes e andamento de leilões ativos**
- **Envio de imagens (upload)**

---

## 🖥️ **User Front-End**

- Interface para os usuários participarem dos leilões em tempo real.

## 🛠️ Tecnologias

- **Typescript 5.6.2** - Linguagem
- **React 18.3.1** - Biblioteca base
- **Vite 6.0.5** - Ferramenta de build
- **Tailwind 3.4.11** - Estilização
- **WebSocket** - Comunicação

## 🚀 Funcionalidades

- **Listagem de leilões disponíveis**
- **Entrada em leilões ativos**
- **Acompanhamento em tempo real de novos lances**
- **Envio de lances durante o leilão**

---

## ⚙️ **Auctions API (Backend)**

- API e servidor de eventos em tempo real para o sistema de leilões.

## 🛠️ Tecnologias

- **Typescript 5.7.3** - Linguagem
- **Nodejs** - Servidor
- **SQLite3 5.1.7** - Banco de Dados
- **WebSocket + REST API básica** - Comunicação
- **Sequelize 6.37.5** - ORM JavaScript
- **Express 4.21.2** - Framework backend
- **Controllers, Services, Events e Models** - Organização

## 🚀 Funcionalidades

- **Criar e gerenciar leilões**
- **Registrar e validar novos lances**
- **Persistência em banco SQLite**
- **Emissão de eventos em tempo real via WebSocket**

---

## 🔗 Arquitetura do Sistema

1. **Auctioneer (Admin)** cria e gerencia leilões → envia dados para a **Auctions API**.
2. **Auctions API** persiste os dados e transmite eventos via **WebSocket**.
3. **User Front-End (Usuário)** recebe as atualizações em tempo real e permite envio de lances.

---

## 🚀 Execução

### Desenvolvimento

```bash
# Clonar repositório
 git clone <repository-url>
 cd leilao-websocket

```

### Executar os projetos

- **Backend (API + WebSocket)**

```bash
# Acessar repositório auctions-api
cd auctions-api

# Instalar dependências do projeto
 pnpm install

# Executar Projeto
 pnpm dev
```

- **Frontend Admin (Auctioneer)**

```bash
# Acessar repositório auctioneer
cd auctioneer

# Instalar dependências do projeto
 pnpm install

# Executar Projeto
 pnpm dev
```

- **User-front-end**

```bash
# Acessar repositório user-front-end
cd user-front-end

# Instalar dependências do projeto
 pnpm install

# Executar Projeto
 pnpm dev
```

---
