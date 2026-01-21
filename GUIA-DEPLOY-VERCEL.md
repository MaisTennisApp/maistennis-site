# 🚀 GUIA DE DEPLOY NO VERCEL

## 📦 O QUE VOCÊ TEM:

1. ✅ **Landing Page Responsiva** (`public/index.html`)
2. ✅ **Página de Confirmação** (`public/confirmar.html`)
3. ✅ **API de Validação** (`api/confirm-token.js`)
4. ✅ **Email Atualizado** (`services/emailService.ts`)

---

## 🎯 PASSO A PASSO:

### **1️⃣ FAZER UPLOAD DOS ARQUIVOS**

Você tem 2 opções:

#### **OPÇÃO A: Via GitHub (Recomendado)**

1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos da pasta `maistennis-vercel`
3. Conecte o Vercel ao repositório

#### **OPÇÃO B: Via Vercel CLI**

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Na pasta do projeto:
```bash
cd maistennis-vercel
vercel
```

3. Siga as instruções

---

### **2️⃣ CONFIGURAR VARIÁVEIS DE AMBIENTE**

No painel do Vercel:

1. Vá em **"Settings"** → **"Environment Variables"**
2. Adicione:

```
SUPABASE_URL = https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY = sua_service_role_key_aqui
```

**Onde encontrar:**
- Supabase Dashboard → Settings → API
- Use a **Service Role Key** (não a anon key!)

---

### **3️⃣ CONECTAR DOMÍNIO**

1. No Vercel, vá em **"Domains"**
2. Adicione: `maistennis.com.br`
3. O Vercel vai mostrar os DNS records
4. Como o domínio já está no Vercel, deve funcionar automaticamente

---

### **4️⃣ TESTAR O SITE**

#### **Teste 1: Landing Page**

1. Acesse: `https://maistennis.com.br`
2. Verifique:
   - ✅ Logo aparece
   - ✅ Responsivo no mobile
   - ✅ Botões funcionam

#### **Teste 2: Página de Confirmação**

1. Acesse: `https://maistennis.com.br/confirmar?token=teste123`
2. Deve mostrar erro (token inválido)
3. Se mostrar, a página funciona!

#### **Teste 3: API**

1. Acesse: `https://maistennis.com.br/api/confirm-token?token=teste123`
2. Deve retornar JSON com erro
3. Se retornar, a API funciona!

---

### **5️⃣ ATUALIZAR O APP**

#### **Arquivo: `services/emailService.ts`**

Já está atualizado! Mas você precisa:

1. Abrir: `C:\Users\willi\easy-tennis\services\emailService.ts`
2. Substituir pelo arquivo atualizado
3. Reiniciar o app: `npx expo start --clear`

---

### **6️⃣ TESTAR FLUXO COMPLETO**

1. **Criar conta no app**
   - Nome: Seu nome
   - Email: Seu email
   - Senha: Qualquer senha

2. **Verificar email**
   - Abrir email do +Tennis
   - Verificar se tem:
     - ✅ Logo do +Tennis
     - ✅ Apenas 1 botão (laranja)
     - ✅ Texto "Confirmar Email"

3. **Clicar no botão**
   - Abre página web
   - Mostra "Confirmando..."
   - Depois mostra "Email Confirmado!"

4. **Clicar em "Abrir +Tennis App"**
   - Tenta abrir o app
   - Se não funcionar, abre manualmente

5. **Fazer login**
   - Email: O que você cadastrou
   - Senha: A que você criou
   - Deve funcionar!

---

## 📊 ESTRUTURA DE ARQUIVOS:

```
maistennis-vercel/
├── public/
│   ├── index.html          (Landing page)
│   └── confirmar.html      (Confirmação)
├── api/
│   └── confirm-token.js    (API de validação)
├── package.json
├── vercel.json
└── GUIA-DEPLOY-VERCEL.md
```

---

## ❌ PROBLEMAS COMUNS:

### **Erro: "Variáveis de ambiente não configuradas"**

**Solução:**
- Verifique se adicionou `SUPABASE_URL` e `SUPABASE_SERVICE_KEY`
- Faça redeploy após adicionar

---

### **Erro: "Token inválido"**

**Solução:**
- Verifique se a tabela `email_confirmations` existe
- Verifique se o token foi salvo no banco

---

### **Logo não aparece**

**Solução:**
- A logo está hospedada em CDN
- Se não carregar, substitua pela URL da sua logo

---

### **Botão não abre o app**

**Solução:**
- Deep links só funcionam em dispositivos reais
- No navegador, não funciona
- Teste no celular!

---

## ✅ CHECKLIST FINAL:

Antes de considerar pronto:

- [ ] Site no ar em `maistennis.com.br`
- [ ] Landing page responsiva
- [ ] Página de confirmação funciona
- [ ] API retorna JSON
- [ ] Variáveis de ambiente configuradas
- [ ] Email atualizado no app
- [ ] Teste de cadastro funcionou
- [ ] Email chegou com logo
- [ ] Botão de confirmação funciona
- [ ] Login funciona após confirmação

---

## 🎉 PRONTO!

Agora você tem:

✅ **Site profissional** (responsivo)  
✅ **Confirmação por email** (1 botão só)  
✅ **Logo real** (não emoji)  
✅ **API funcionando** (Vercel Serverless)  
✅ **Domínio próprio** (maistennis.com.br)  

---

**Qualquer dúvida, me chame!** 🚀
