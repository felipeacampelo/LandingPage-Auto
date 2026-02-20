# Rei da Verdade - Auto de Páscoa 2026

Landing page moderna e responsiva para o evento "Auto de Páscoa 2026 – Rei da Verdade" da Igreja Batista Capital em Brasília.

## 🎭 Sobre o Projeto

Uma landing page de alta conversão com design cinematográfico, épico e solene. Inclui integração com a API do Asaas para geração de cobranças via PIX.

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Estilização**: Tailwind CSS
- **Componentes UI**: Radix UI
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Pagamento**: API Asaas (PIX)

## 🎨 Paleta de Cores

| Cor | Hex |
|-----|-----|
| Dourado | `#D4AF37` |
| Vinho | `#722F37` |
| Preto | `#0A0A0A` |
| Branco Gelo | `#F8F8FF` |

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Asaas
ASAAS_API_KEY=sua_chave_api_aqui
ASAAS_API_URL=https://sandbox.asaas.com/api/v3

# Para produção, use:
# ASAAS_API_URL=https://www.asaas.com/api/v3
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── actions/
│   │   └── asaas.ts          # Server Action para API Asaas
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # Componentes base (Button, Input, etc.)
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── FeaturesGrid.tsx
│   ├── StorySection.tsx
│   ├── ScheduleSection.tsx
│   ├── CheckoutForm.tsx
│   ├── PixModal.tsx
│   └── Footer.tsx
└── lib/
    ├── utils.ts
    └── validators.ts         # Validação de CPF, telefone, etc.
```

## 📅 Sessões do Evento

- **30/03** - Domingo, 19h00
- **31/03** - Segunda, 20h00
- **01/04** - Terça, 20h00
- **02/04** - Quarta, 20h00
- **03/04** - Quinta, 20h00

## 🔧 Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves com Framer Motion
- ✅ Formulário de checkout com validação
- ✅ Integração PIX via API Asaas
- ✅ QR Code e código "Copia e Cola"
- ✅ Validação de CPF em tempo real
- ✅ SEO otimizado

## 📝 API Asaas

A integração utiliza os seguintes endpoints:

- `GET /customers` - Buscar cliente por CPF
- `POST /customers` - Criar novo cliente
- `POST /payments` - Criar cobrança PIX
- `GET /payments/{id}/pixQrCode` - Obter QR Code

## 🚢 Deploy

```bash
# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 📄 Licença

Projeto desenvolvido para a Igreja Batista Capital.

---

Feito com ❤️ por voluntários
