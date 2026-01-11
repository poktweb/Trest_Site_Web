# meu-projeto

Projeto Trest otimizado para deploy na Vercel

## 🚀 Deploy na Vercel

### Opção 1: Via CLI da Vercel

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Fazer deploy
vercel

# Para produção
vercel --prod
```

### Opção 2: Via GitHub/GitLab

1. Conecte seu repositório na Vercel
2. Configure o projeto (Vercel detectará automaticamente)
3. Faça deploy

## 📁 Estrutura do Projeto

```
meu-projeto/
├── api/
│   └── index.js          # Serverless function adapter
├── app.trest             # Arquivo principal da aplicação
├── vercel.json           # Configuração Vercel
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar localmente
npm start

# Modo desenvolvimento (verbose)
npm run dev
```

## 📚 Documentação

- [Documentação Completa Trest](https://trest-site.vercel.app)
- [Guia de Deploy Vercel](./VERCEL_DEPLOY.md) (se disponível)
- [Site Oficial](https://trest-site.vercel.app)

## 📝 Notas

- Usando Trest Language v2.5.0
- Projeto otimizado para serverless functions
- Rotas são definidas em `app.trest`

---

Criado com ❤️ usando Trest Language v2.5.0
