import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { useModulos } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/conhecimento/")({
  head: () => ({
    meta: [
      { title: "Conhecimento — Módulos 3S Checkout" },
      {
        name: "description",
        content:
          "Os 8 módulos do ecossistema 3S: PDV, KDS, Totem, Mobile, NFC-e, Backoffice, TMA e Kinesis.",
      },
      { property: "og:title", content: "Conhecimento — Módulos 3S Checkout" },
      {
        property: "og:description",
        content: "Descrição comercial de cada módulo do ecossistema 3S Checkout.",
      },
    ],
  }),
  component: Conhecimento,
});

function Conhecimento() {
  const { data, isLoading } = useModulos();

  return (
    <Page>
      <PageHeader
        title="Conhecimento"
        subtitle="Os 8 módulos do ecossistema 3S, com o argumento comercial de cada um."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)}

        {data?.map((m) => (
          <Link
            key={m.id}
            to="/conhecimento/$moduloId"
            params={{ moduloId: m.id }}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
          >
            <Badge variant="secondary" className="w-fit text-[11px]">
              {m.categoria}
            </Badge>
            <h2 className="mt-3 text-lg font-extrabold">{m.nome}</h2>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{m.descricao}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Ver detalhe{" "}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Page>
  );
}
