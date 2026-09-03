# 3S Toolbox Hub

Crie um app web comercial chamado "Caixa de Ferramentas 3S Checkout" com sidebar de navegação e as seguintes páginas:

Home — cards de acesso rápido às ferramentas (Conhecimento, Proposta, Calculadora, Deep Dive, Pré-Vendas, Clientes, Gamificação)

Conhecimento — grid de cards com os 8 módulos do ecossistema 3S (PDV, KDS, Totem, Mobile, NFC-e, Backoffice, TMA, Kinesis), cada um com nome, descrição e link para detalhe

Proposta — formulário em 3 steps: (1) dados do parceiro: nome, qtd lojas, tempo de contrato, upload opcional; (2) seleção de módulos com cards compactos (nome + preço editável + checkbox Isentar + botão remover) organizados em 3 seções (Instalação & Setup, Mensalidade, Produtos Adicionais) com botão "+ Adicionar módulo" em cada; (3) preview da proposta com resumo financeiro e botão de download PDF

Calculadora — campo de busca de marca com autocomplete + 4 inputs (GMV, desconto %, nº lojas, mensalidade) e 4 cards de resultado

Deep Dive — 3 abas: Funcionalidades 3S (9 cards clicáveis com modal), Produtos Cross-Sell (3S Eats, 3S Go), Integrações (7 cards)

Pré-Vendas — formulário Google Forms embedado em iframe

Clientes — tabela buscável com filtro de status, colunas: marca, subtabela, tipo de culinária, status, mensalidade 2026; ao clicar numa linha abre detalhe com 21 campos

Gamificação — 2 abas: Quiz 3S (perguntas de múltipla escolha com feedback imediato) e Desafio de Objeções (10 objeções com 3 opções cada, cronômetro de 30s)

Identidade visual: vermelho iFood #EA1D2C, cream #F5F0EB, cinza #404040. Fonte Montserrat. Layout responsivo.

Importante: NÃO usar Supabase/Lovable Cloud. Todos os dados (módulos, marcas, clientes, perguntas do quiz, objeções, etc.) devem vir de uma API REST externa consumida via fetch() — usar dados mock/placeholder no fetch por enquanto já que a API real ainda não foi definida, mas estruturar o código para consumo de API externa (services/hooks separados), não banco de dados embutido.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sales-toolbox-3s.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f70d9546-7f42-4cd6-920c-dc3eeeeb42b4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
