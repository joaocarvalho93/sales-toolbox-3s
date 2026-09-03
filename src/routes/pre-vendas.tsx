import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_placeholder_3s_checkout/viewform?embedded=true";

export const Route = createFileRoute("/pre-vendas")({
  head: () => ({
    meta: [
      { title: "Pré-Vendas — Qualificação de leads 3S Checkout" },
      {
        name: "description",
        content:
          "Formulário de pré-vendas do 3S Checkout para qualificar leads antes da reunião comercial.",
      },
      { property: "og:title", content: "Pré-Vendas — 3S Checkout" },
      {
        property: "og:description",
        content: "Preencha a qualificação do lead antes da reunião comercial.",
      },
    ],
  }),
  component: PreVendas,
});

function PreVendas() {
  return (
    <Page>
      <PageHeader
        title="Pré-Vendas"
        subtitle="Preencha a qualificação do lead. As respostas seguem direto para o time de pré-vendas."
        action={
          <Button asChild variant="outline">
            <a href={FORM_URL.replace("?embedded=true", "")} target="_blank" rel="noreferrer">
              Abrir em nova aba <ExternalLink className="size-4" />
            </a>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <iframe
          title="Formulário de pré-vendas 3S Checkout"
          src={FORM_URL}
          className="h-[1200px] w-full border-0"
          loading="lazy"
        >
          Carregando…
        </iframe>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Formulário placeholder. Substitua a URL pelo Google Forms oficial do time.
      </p>
    </Page>
  );
}
