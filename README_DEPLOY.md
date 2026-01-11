# 🚀 Deploy na Vercel - Trest SiteWeb

Este documento explica como fazer deploy deste projeto na Vercel.

## 📋 Pré-requisitos

1. **Conta na Vercel**: [vercel.com](https://vercel.com)
2. **Node.js**: >= 18.0.0
3. **Git** configurado (GitHub, GitLab ou Bitbucket)

## 🚀 Deploy Rápido

### Opção 1: Via CLI da Vercel (Recomendado)

```bash
# 1. Instalar Vercel CLI (se não tiver)
npm install -g vercel

# 2. Login na Vercel
vercel login

# 3. Deploy
vercel

# 4. Para produção
vercel --prod
```

### Opção 2: Via Painel da Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Configure o projeto:
   - **Framework Preset**: Other
   - **Build Command**: `npm install`
   - **Output Directory**: `.`
   - **Install Command**: `npm install`
5. Clique em **"Deploy"**

## ⚙️ Configuração do Projeto

### Arquivos Importantes

- **`vercel.json`**: Configuração do Vercel
- **`package.json`**: Dependências e scripts
- **`.vercelignore`**: Arquivos ignorados no deploy

### Estrutura

O projeto está configurado para executar o Trest diretamente. A Vercel vai:
1. Instalar as dependências (`treste`)
2. Executar o servidor Trest usando o comando do `package.json`

## 🔧 Configuração Avançada

### Variáveis de Ambiente

Se precisar adicionar variáveis de ambiente:

1. No painel da Vercel: **Settings** → **Environment Variables**
2. Adicione as variáveis necessárias
3. Ou via CLI: `vercel env add NOME_VARIAVEL`

### Build Personalizado

Se precisar customizar o build, edite o `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm install && npm run build",
  "devCommand": "trest src/main.trest",
  "installCommand": "npm install",
  "outputDirectory": "."
}
```

## 🌐 Após o Deploy

Após o deploy bem-sucedido:

- **URL de produção**: `https://seu-projeto.vercel.app`
- **URL de preview**: Criada automaticamente para cada commit
- **Domínio customizado**: Configure em **Settings** → **Domains**

## 📝 Rotas Disponíveis

- `/` - Página principal (documentação)
- `/login` - Página de login
- `/admin` - Painel administrativo (requer login)
- `/api/status` - API de status
- `/api/comments` - API de comentários (GET, POST)
- `/api/login` - API de autenticação (POST)
- `/api/logout` - API de logout (POST)
- `/api/admin/comments/:id` - API admin (POST, DELETE)

## ⚠️ Considerações Importantes

### Sessões em Memória

As sessões são armazenadas em memória. Em ambiente serverless:
- **Problema**: Cada requisição pode ir para uma instância diferente
- **Solução recomendada**: Use cookies com tokens seguros (já implementado) ou serviço externo (Redis)

### Arquivos JSON

Os arquivos `data/comments.json` e `data/users.json`:
- **Funcionam** se estiverem no repositório
- **Limitação**: Em serverless, escrita pode ser limitada
- **Recomendação**: Use banco de dados (PostgreSQL, MongoDB) para produção

### Credenciais

Para produção, mova credenciais para variáveis de ambiente:
- Usuário e senha do admin
- Chaves de criptografia
- Configurações sensíveis

## 🔍 Troubleshooting

### Erro: "Command not found: trest"

**Solução**: O `treste` precisa estar instalado. Verifique:
```bash
npm install treste
```

### Erro: "Cannot find module"

**Solução**: 
```bash
npm install
```

### Porta não definida

**Solução**: A Vercel injeta a porta via `process.env.PORT`. O código Trest usa porta 3000 por padrão. Verifique se o servidor Trest respeita a variável de ambiente.

### Timeout na função

**Solução**: A Vercel tem limite de tempo para funções serverless. Se o servidor Trest demorar muito para iniciar, considere compilar para JavaScript.

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Trest](https://trest-site.vercel.app)
- [Trest no NPM](https://www.npmjs.com/package/treste)

## 📄 Licença

MIT
