# Quick Interview

Quick Interview é uma aplicação web desenvolvida com **Next.js** que permite a realização de entrevistar utilizando AI. A plataforma permite que através de uma descrição de vaga o user seja entrevistado por uma IA e ao final Receba um feedback de sua entrevista. Ao mesmo tempo a IA fornece um relatório especial para o gestor da vaga.

## 📋 Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
- [Execução do Projeto](#execução-do-projeto)
- [Licença](#licença)

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicações web.
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces de usuário.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário.
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript para tipagem estática.
- [React Query](https://tanstack.com/query/latest) - Gerenciamento de estado e cache para dados assíncronos.
- [OpenAI API](https://openai.com/api/) - Utilizado para transcrição de áudio e geração de avaliações.

## 🔧 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- **Node.js** (versão 14 ou superior)
- **Yarn** ou **npm**

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Marcosfsalazar/quick-interview.git
   ```

2. **Acesse o diretório do projeto**

   ```bash
   cd quick-interview
   ```

3. **Instale as dependências**

   Usando Yarn:

   ```bash
   yarn install
   ```

   Ou usando npm:

   ```bash
   npm install
   ```

## 🚧 Configuração das Variáveis de Ambiente

O projeto utiliza a API da OpenAI para transcrição de áudio e geração de avaliações. Para isso, você precisa configurar a chave da API.

1. Crie um arquivo `.env.local` na raiz do projeto

   ```bash
   touch .env.local
   ```

2. Adicione sua chave da API da OpenAI no arquivo `.env.local`

   ```env
   OPENAI_API_KEY=sk-...
   ```

## 🏃 Execução do Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

Usando Yarn:

```bash
yarn dev
```

Ou usando npm:

```bash
npm run dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## 👑 Licença

Este projeto está licenciado sob a licença MIT.
