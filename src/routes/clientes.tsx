import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientes } from "@/hooks/use-api";
import type { Cliente } from "@/services/api";
import { brl, num } from "@/lib/format";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — Base comercial 3S Checkout" },
      {
        name: "description",
        content:
          "Base de clientes 3S Checkout com busca, filtro de status, mensalidade 2026 e ficha detalhada por marca.",
      },
      { property: "og:title", content: "Clientes — 3S Checkout" },
      {
        property: "og:description",
        content: "Consulte marcas, status de contrato e mensalidade 2026 da carteira.",
      },
    ],
  }),
  component: Clientes,
});

const STATUS = ["Todos", "Ativo", "Em implantação", "Churn", "Prospect"] as const;

const statusVariant = (s: Cliente["status"]) =>
  s === "Ativo"
    ? "bg-success/15 text-success"
    : s === "Churn"
      ? "bg-primary/15 text-primary"
      : s === "Prospect"
        ? "bg-muted text-muted-foreground"
        : "bg-warning/20 text-warning-foreground";

function Clientes() {
  const { data, isLoading } = useClientes();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("Todos");
  const [sel, setSel] = useState<Cliente | null>(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data ?? []).filter(
      (c) =>
        (status === "Todos" || c.status === status) &&
        (!term ||
          c.marca.toLowerCase().includes(term) ||
          c.culinaria.toLowerCase().includes(term) ||
          c.subtabela.toLowerCase().includes(term)),
    );
  }, [data, q, status]);

  return (
    <Page>
      <PageHeader
        title="Clientes"
        subtitle="Carteira de marcas atendidas. Clique em uma linha para ver a ficha completa."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por marca, culinária ou subtabela…"
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Subtabela</TableHead>
                <TableHead>Tipo de culinária</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Mensalidade 2026</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow
                  key={c.id}
                  onClick={() => setSel(c)}
                  className="cursor-pointer hover:bg-muted/60"
                >
                  <TableCell className="font-semibold">{c.marca}</TableCell>
                  <TableCell>{c.subtabela}</TableCell>
                  <TableCell>{c.culinaria}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusVariant(c.status)}`}
                    >
                      {c.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {brl(c.mensalidade2026)}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Sheet open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{sel?.marca}</SheetTitle>
            <SheetDescription>Ficha completa do cliente</SheetDescription>
          </SheetHeader>
          {sel && (
            <dl className="grid gap-4 px-4 pb-8 sm:grid-cols-2">
              <F l="Marca" v={sel.marca} />
              <F l="Subtabela" v={sel.subtabela} />
              <F l="Tipo de culinária" v={sel.culinaria} />
              <F l="Status" v={sel.status} />
              <F l="Mensalidade 2026" v={brl(sel.mensalidade2026)} />
              <F l="CNPJ" v={sel.cnpj} />
              <F l="Responsável" v={sel.responsavel} />
              <F l="E-mail" v={sel.email} />
              <F l="Telefone" v={sel.telefone} />
              <F l="Cidade" v={sel.cidade} />
              <F l="UF" v={sel.uf} />
              <F l="Nº de lojas" v={num(sel.lojas)} />
              <F l="GMV mensal" v={brl(sel.gmvMensal)} />
              <F l="Ticket médio" v={brl(sel.ticketMedio)} />
              <F l="Pedidos/mês" v={num(sel.pedidosMes)} />
              <F l="Início do contrato" v={sel.inicioContrato} />
              <F l="Fim do contrato" v={sel.fimContrato} />
              <F l="Gerente de conta" v={sel.gerenteConta} />
              <F l="NPS" v={String(sel.nps)} />
              <F l="Última interação" v={sel.ultimaInteracao} />
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-muted-foreground uppercase">Módulos</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {sel.modulos.map((m) => (
                    <Badge key={m} variant="secondary">
                      {m}
                    </Badge>
                  ))}
                  {sel.integracoes.map((m) => (
                    <Badge key={m}>{m}</Badge>
                  ))}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-muted-foreground uppercase">
                  Observações
                </dt>
                <dd className="mt-1 text-sm">{sel.observacoes}</dd>
              </div>
            </dl>
          )}
        </SheetContent>
      </Sheet>
    </Page>
  );
}

function F({ l, v }: { l: string; v: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted-foreground uppercase">{l}</dt>
      <dd className="mt-0.5 text-sm font-semibold break-words">{v}</dd>
    </div>
  );
}
