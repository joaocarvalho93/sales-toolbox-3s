import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Page } from "@/components/AppLayout";
import { useModulo } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/conhecimento/$moduloId")({
  head: () => ({
    meta: [
      { title: "Detalhe do módulo — 3S Checkout" },
      {
        name: "description",
        content: "Detalhe comercial e benefícios do módulo do ecossistema 3S Checkout.",
      },
      { property: "og:title", content: "Detalhe do módulo — 3S Checkout" },
      {
        property: "og:description",
        content: "Argumentos e benefícios do módulo selecionado do ecossistema 3S.",
      },
    ],
  }),
  component: ModuloDetalhe,
});

function ModuloDetalhe() {
  const { moduloId } = Route.useParams();
  const { data, isLoading } = useModulo(moduloId);

  return (
    <Page>
      <Link
        to="/conhecimento"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="size-4" /> Voltar para Conhecimento
      </Link>

      {isLoading && <Skeleton className="h-72 rounded-xl" />}

      {!isLoading && !data && (
        <p className="text-sm text-muted-foreground">Módulo não encontrado.</p>
      )}

      {data && (
        <article className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <Badge variant="secondary">{data.categoria}</Badge>
          <h1 className="mt-3 text-3xl font-extrabold">{data.nome}</h1>
          <p className="mt-2 text-base text-muted-foreground">{data.descricao}</p>

          <div className="mt-6 rounded-xl bg-muted/60 p-5 text-sm/relaxed">{data.detalhe}</div>

          <h2 className="mt-8 text-sm font-bold tracking-wide uppercase">Benefícios para a venda</h2>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {data.beneficios.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
        </article>
      )}
    </Page>
  );
}
