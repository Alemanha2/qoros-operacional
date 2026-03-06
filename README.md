# Qoros Capital — Sistema de Gestão Operacional
## Versão com Supabase (dados em tempo real compartilhados)

---

## Como publicar no Vercel (passo a passo)

### 1. Criar repositório no GitHub
1. Acesse **github.com** → clique em **"New repository"**
2. Nome: `qoros-operacional`
3. Deixe como **Private**
4. Clique em **"Create repository"**

### 2. Fazer upload dos arquivos
Na página do repositório criado, clique em **"uploading an existing file"** e envie todos os arquivos desta pasta mantendo a estrutura:

```
qoros-supabase/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── supabase.js
```

> Importante: os arquivos dentro de `src/` devem estar dentro de uma pasta chamada `src`.

Clique em **"Commit changes"**.

### 3. Publicar no Vercel
1. Acesse **vercel.com** → faça login com sua conta GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `qoros-operacional`
4. Configurações:
   - **Framework Preset:** Vite
   - **Root Directory:** `qoros-supabase` (ou `.` se subiu na raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**

Após ~2 minutos, seu link ficará disponível:
**`https://qoros-operacional.vercel.app`**

---

## Links por assessor

| Usuário | Link |
|---|---|
| Carlos Mendes | `https://seu-link.vercel.app/?assessor=carlos-mendes` |
| Ana Beatriz | `https://seu-link.vercel.app/?assessor=ana-beatriz` |
| Rafael Souza | `https://seu-link.vercel.app/?assessor=rafael-souza` |
| Assistente | `https://seu-link.vercel.app/` |

---

## Senhas padrão
Todos os usuários começam com: **`qoros123`**

O Assistente Operacional pode redefinir senhas em **Configurações → Assessores**.

---

## Como funciona o tempo real
Quando qualquer usuário cria ou atualiza um chamado, todos os outros usuários veem a mudança automaticamente em poucos segundos, sem precisar recarregar a página. Isso é possível graças ao Supabase Realtime (já configurado).
