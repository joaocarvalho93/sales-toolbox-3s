import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plug, Sparkles } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCrossSell, useFuncionalidades, useIntegracoes } from "@/hooks/use-api";
import type { Funcionalidade } from "@/services/api";

export const Route = createFileRoute("/deep-dive")({
  head: () => ({
    meta: [
      { title: "Deep Dive — Funcionalidades, cross-sell e integrações 3S" },
      {
        name: "description",
        content:
          "Aprofunde-se nas funcionalidades do 3S Checkout, nos produtos de cross-sell 3S Eats e 3S Go e nas integrações disponíveis.",
      },
      { property: "og:title", content: "Deep Dive — 3S Checkout" },
      {
        property: "og:description",
        content: "Funcionalidades, produtos de cross-sell e integrações do ecossistema 3S.",
      },
    ],
  }),
  component: DeepDive,
});

function DeepDive() {
  const { data: funcs, isLoading } = useFuncionalidades();
  const { data: cross } = useCrossSell();
  const { data: integs } = useIntegracoes();
  const [aberta, setAberta] = useState<Funcionalidade | null>(null);

  return (
    <Page>
      <PageHeader
        title="Deep Dive"
        subtitle="Material de aprofundamento para reuniões técnicas e comerciais."
      />

      <Tabs defaultValue="func">
        <TabsList>
          <TabsTrigger value="func">Funcionalidades 3S</TabsTrigger>
          <TabsTrigger value="cross">Produtos Cross-Sell</TabsTrigger>
          <TabsTrigger value="integ">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="func" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading &&
              Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-xl" />
              ))}
            {funcs?.map((f) => (
              <button
                key={f.id}
                onClick={() => setAberta(f)}
                className="rounded-xl border border-border bg-card p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
              >
                <Sparkles className="size-5 text-primary" />
                <h3 className="mt-3 text-base font-bold">{f.nome}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.resumo}</p>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cross" className="mt-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {cross?.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <h3 className="text-lg font-extrabold text-primary">{c.nome}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.descricao}</p>
                <ul className="mt-4 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integ" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {integs?.map((i) => (
              <div key={i.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between gap-3">
                  <Plug className="size-5 text-primary" />
                  <Badge variant="secondary" className="text-[11px]">
                    {i.categoria}
                  </Badge>
                </div>
                <h3 className="mt-3 text-base font-bold">{i.nome}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{i.descricao}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!aberta} onOpenChange={(o) => !o && setAberta(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{aberta?.nome}</DialogTitle>
            <DialogDescription>{aberta?.resumo}</DialogDescription>
          </DialogHeader>
          <p className="text-sm/relaxed">{aberta?.detalhe}</p>
        </DialogContent>
      </Dialog>
    </Page>
  );
}
