import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  ClipboardList,
  FileText,
  Gamepad2,
  Layers,
  Users,
  ArrowRight,
} from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Caixa de Ferramentas 3S Checkout" },
      {
        name: "description",
        content:
          "Acesso rápido às ferramentas comerciais do 3S Checkout: conhecimento, proposta, calculadora, deep dive, pré-vendas, clientes e gamificação.",
      },
      { property: "og:title", content: "Home — Caixa de Ferramentas 3S Checkout" },
      {
        property: "og:description",
        content: "Todas as ferramentas do time comercial 3S Checkout em um só lugar.",
      },
    ],
  }),
  component: Index,
});

const tools = [
  {
    to: "/conhecimento",
    label: "Conhecimento",
    desc: "Os 8 módulos do ecossistema 3S explicados para a conversa comercial.",
    icon: BookOpen,
  },
  {
    to: "/proposta",
    label: "Proposta",
    desc: "Monte a proposta em 3 passos e gere o PDF para o parceiro.",
    icon: FileText,
  },
  {
    to: "/calculadora",
    label: "Calculadora",
    desc: "Simule GMV, desconto e mensalidade por rede em segundos.",
    icon: Calculator,
  },
  {
    to: "/deep-dive",
    label: "Deep Dive",
    desc: "Funcionalidades, produtos de cross-sell e integrações disponíveis.",
    icon: Layers,
  },
  {
    to: "/pre-vendas",
    label: "Pré-Vendas",
    desc: "Formulário de qualificação de leads antes da reunião.",
    icon: ClipboardList,
  },
  {
    to: "/clientes",
    label: "Clientes",
    desc: "Base de marcas com status, mensalidade e ficha completa.",
    icon: Users,
  },
  {
    to: "/gamificacao",
    label: "Gamificação",
    desc: "Quiz 3S e desafio de objeções cronometrado para treinar o time.",
    icon: Gamepad2,
  },
] as const;

function Index() {
  return (
    <Page>
      <div className="mb-10 overflow-hidden rounded-2xl bg-primary px-6 py-10 text-primary-foreground shadow-lift sm:px-10 sm:py-12">
        <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">3S Checkout</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
          Caixa de Ferramentas Comercial
        </h1>
        <p className="mt-3 max-w-xl text-sm/relaxed opacity-90">
          Tudo que o time de vendas precisa para argumentar, precificar e fechar: conhecimento de
          produto, propostas, simulações e treinamento.
        </p>
      </div>

      <PageHeader title="Acesso rápido" subtitle="Escolha uma ferramenta para começar." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(({ to, label, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
          >
            <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <h2 className="mt-4 text-base font-bold">{label}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Abrir <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Page>
  );
}
