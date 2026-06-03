# Saba — Traduzione e Soluzione

Site institucional da Saba — assessoria para brasileiros que buscam cidadania italiana, traduções juramentadas e suporte jurídico na Itália.

Site estático em **HTML + CSS + JavaScript** (sem dependências, sem build), com suporte a 3 idiomas: **Português 🇧🇷 / Inglês 🇺🇸 / Italiano 🇮🇹**.

---

## 📁 Estrutura

```
saba-site/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── main.js          # nav, carrossel, i18n switcher
│   └── translations.js  # textos em PT / EN / IT
├── images/              # assets
├── vercel.json
└── README.md
```

---

## 🚀 Deploy na Vercel

### Opção 1 — via Git (recomendado)

1. Crie um repositório no GitHub e suba os arquivos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/saba-site.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório.
3. Não precisa configurar nada (é estático). Clique em **Deploy**.

### Opção 2 — via CLI

```bash
npm i -g vercel
vercel
```

---

## ✏️ Como editar os textos

Todos os textos ficam em **`scripts/translations.js`**, organizados por idioma (`pt`, `en`, `it`) e por seção. Basta editar a string desejada — não precisa mexer no HTML.

```js
hero: {
  title: 'A Itália começa aqui,<br/>com tudo em ordem.',
  // ...
}
```

---

## 🌐 Como funciona a troca de idioma

- Os 3 botões com bandeiras no topo direito acionam `setLanguage('pt' | 'en' | 'it')`.
- A escolha é salva em `localStorage` (`saba_lang`).
- Na primeira visita, detecta o idioma do navegador.
- Atualiza todos os elementos com `data-i18n="caminho.do.texto"` automaticamente.

---

## 📞 Contato exibido no site

- **Localização:** Roma, Itália
- **Telefone:** +39 393 267 8931
- **E-mail:** saba.traduzioni@gmail.com
- **WhatsApp:** [wa.me/393932678931](https://wa.me/393932678931)

> Para alterar, edite `index.html` (footer + botões WhatsApp) e `scripts/translations.js`.

---

## 📨 Formulário de contato

O `<form>` da seção contato está apontado para `formspree.io` (placeholder).
Para ativar:

1. Crie uma conta gratuita em [Formspree](https://formspree.io/).
2. Copie o endpoint (algo como `https://formspree.io/f/xyzabcde`).
3. Substitua o `action` do `<form class="contact-form">` em `index.html`.

Alternativas: [Web3Forms](https://web3forms.com/), [Getform](https://getform.io/), Netlify Forms.

---

## 🎨 Paleta

| Cor | Hex |
|---|---|
| Verde Saba escuro | `#0e3a23` |
| Verde Saba médio | `#1a5a37` |
| Creme | `#f6e9c7` |
| Terracota | `#b34a1c` |
| Dourado | `#d6b46a` |
| WhatsApp | `#25d366` |

Variáveis CSS centralizadas em `styles/main.css` (`:root`).

---

## ✅ Checklist pós-deploy

- [ ] Configurar Formspree (ou similar) e atualizar `action` do form
- [ ] Atualizar links sociais (Facebook / Instagram) no header e footer
- [ ] Validar número do WhatsApp em todos os botões
- [ ] Otimizar imagens (sugestão: rodar via [squoosh.app](https://squoosh.app))
- [ ] Adicionar `favicon.ico` na raiz
- [ ] Configurar domínio próprio na Vercel
