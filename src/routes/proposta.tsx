import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, Download, Plus, Trash2, Upload } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCatalogo } from "@/hooks/use-api";
import type { ItemCatalogo } from "@/services/api";
import { brl } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/proposta")({
  head: () => ({
    meta: [
      { title: "Proposta comercial — 3S Checkout" },
      {
        name: "description",
        content:
          "Monte a proposta 3S Checkout em três passos: dados do parceiro, seleção de módulos e preview com resumo financeiro.",
      },
      { property: "og:title", content: "Proposta comercial — 3S Checkout" },
      {
        property: "og:description",
        content: "Gerador de propostas comerciais do 3S Checkout com download em PDF.",
      },
    ],
  }),
  component: Proposta,
});

type Linha = { uid: string; nome: string; preco: number; isento: boolean };
type Secao = ItemCatalogo["secao"];

const SECOES: { key: Secao; titulo: string }[] = [
  { key: "instalacao", titulo: "Instalação & Setup" },
  { key: "mensalidade", titulo: "Mensalidade" },
  { key: "adicionais", titulo: "Produtos Adicionais" },
];

const steps = ["Dados do parceiro", "Módulos e preços", "Preview da proposta"];

function Proposta() {
  const { data: catalogo } = useCatalogo();
  const [step, setStep] = useState(0);

  const [parceiro, setParceiro] = useState("");
  const [lojas, setLojas] = useState("1");
  const [contrato, setContrato] = useState("12");
  const [arquivo, setArquivo] = useState<string | null>(null);

  const [linhas, setLinhas] = useState<Record<Secao, Linha[]>>({
    instalacao: [],
    mensalidade: [],
    adicionais: [],
  });

  // Pré-preenche com um item padrão de cada seção quando o catálogo chega.
  useEffect(() => {
    if (!catalogo) return;
    setLinhas((prev) => {
      if (prev.instalacao.length || prev.mensalidade.length || prev.adicionais.length) return prev;
      const pick = (s: Secao, n: number) =>
        catalogo
          .filter((c) => c.secao === s)
          .slice(0, n)
          .map((c) => ({ uid: `${c.id}-${Math.random().toString(36).slice(2, 7)}`, nome: c.nome, preco: c.preco, isento: false }));
      return { instalacao: pick("instalacao", 1), mensalidade: pick("mensalidade", 2), adicionais: [] };
    });
  }, [catalogo]);

  const totais = useMemo(() => {
    const soma = (s: Secao) =>
      linhas[s].reduce((acc, l) => acc + (l.isento ? 0 : Number(l.preco) || 0), 0);
    const instalacao = soma("instalacao");
    const mensalidade = soma("mensalidade") + soma("adicionais");
    const qtdLojas = Math.max(1, Number(lojas) || 1);
    const meses = Math.max(1, Number(contrato) || 1);
    return {
      instalacao,
      mensalidade,
      instalacaoTotal: instalacao * qtdLojas,
      mensalidadeTotal: mensalidade * qtdLojas,
      contratoTotal: instalacao * qtdLojas + mensalidade * qtdLojas * meses,
      qtdLojas,
      meses,
    };
  }, [linhas, lojas, contrato]);

  const update = (s: Secao, uid: string, patch: Partial<Linha>) =>
    setLinhas((p) => ({ ...p, [s]: p[s].map((l) => (l.uid === uid ? { ...l, ...patch } : l)) }));

  const remove = (s: Secao, uid: string) =>
    setLinhas((p) => ({ ...p, [s]: p[s].filter((l) => l.uid !== uid) }));

  const add = (s: Secao, itemId: string) => {
    const item = catalogo?.find((c) => c.id === itemId);
    if (!item) return;
    setLinhas((p) => ({
      ...p,
      [s]: [
        ...p[s],
        { uid: `${item.id}-${Math.random().toString(36).slice(2, 7)}`, nome: item.nome, preco: item.preco, isento: false },
      ],
    }));
  };

  return (
    <Page>
      <PageHeader
        title="Proposta"
        subtitle="Três passos para gerar a proposta comercial do parceiro."
      />

      <ol className="no-print mb-8 flex flex-wrap gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <button
              onClick={() => setStep(i)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                i === step
                  ? "border-primary bg-primary text-primary-foreground"
                  : i < step
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground",
              )}
            >
              <span className="grid size-5 place-items-center rounded-full bg-background/25 text-xs">
                {i < step ? <Check className="size-3" /> : i + 1}
              </span>
              {s}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold">Dados do parceiro</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="parceiro">Nome do parceiro</Label>
              <Input
                id="parceiro"
                value={parceiro}
                onChange={(e) => setParceiro(e.target.value)}
                placeholder="Ex.: Burger House"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="lojas">Quantidade de lojas</Label>
              <Input
                id="lojas"
                type="number"
                min={1}
                value={lojas}
                onChange={(e) => setLojas(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="contrato">Tempo de contrato (meses)</Label>
              <Input
                id="contrato"
                type="number"
                min={1}
                value={contrato}
                onChange={(e) => setContrato(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="arquivo">Anexo (opcional)</Label>
              <label
                htmlFor="arquivo"
                className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-5 text-sm text-muted-foreground hover:border-primary/50"
              >
                <Upload className="size-4" />
                {arquivo ?? "Clique para anexar um documento de apoio"}
              </label>
              <input
                id="arquivo"
                type="file"
                className="hidden"
                onChange={(e) => setArquivo(e.target.files?.[0]?.name ?? null)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setStep(1)} disabled={!parceiro.trim()}>
              Continuar
            </Button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-6">
          {SECOES.map(({ key, titulo }) => (
            <div key={key} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold">{titulo}</h2>
                <AddModulo
                  options={(catalogo ?? []).filter((c) => c.secao === key)}
                  onAdd={(id) => add(key, id)}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {linhas[key].length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum item nesta seção.</p>
                )}
                {linhas[key].map((l) => (
                  <div
                    key={l.uid}
                    className={cn(
                      "rounded-xl border border-border bg-background p-4",
                      l.isento && "opacity-70",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold">{l.nome}</p>
                      <button
                        aria-label={`Remover ${l.nome}`}
                        onClick={() => remove(key, l.uid)}
                        className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-primary"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-muted-foreground">R$</span>
                        <Input
                          type="number"
                          min={0}
                          value={l.preco}
                          disabled={l.isento}
                          onChange={(e) =>
                            update(key, l.uid, { preco: Number(e.target.value) || 0 })
                          }
                          className="h-8 w-28"
                          aria-label={`Preço de ${l.nome}`}
                        />
                      </div>
                      <label className="flex items-center gap-2 text-xs font-semibold">
                        <Checkbox
                          checked={l.isento}
                          onCheckedChange={(v) => update(key, l.uid, { isento: v === true })}
                        />
                        Isentar
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>
              Voltar
            </Button>
            <Button onClick={() => setStep(2)}>Ver preview</Button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <div className="print-area rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                  3S Checkout
                </p>
                <h2 className="mt-1 text-2xl font-extrabold">Proposta comercial</h2>
              </div>
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-sm font-extrabold text-primary-foreground">
                3S
              </span>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <Info label="Parceiro" value={parceiro || "—"} />
              <Info label="Lojas" value={String(totais.qtdLojas)} />
              <Info label="Contrato" value={`${totais.meses} meses`} />
            </dl>

            {SECOES.map(({ key, titulo }) =>
              linhas[key].length ? (
                <div key={key} className="mt-7">
                  <h3 className="text-sm font-bold tracking-wide uppercase">{titulo}</h3>
                  <table className="mt-2 w-full text-sm">
                    <tbody>
                      {linhas[key].map((l) => (
                        <tr key={l.uid} className="border-b border-border/70">
                          <td className="py-2">{l.nome}</td>
                          <td className="py-2 text-right font-semibold">
                            {l.isento ? (
                              <span className="text-success">Isento</span>
                            ) : (
                              brl(Number(l.preco) || 0)
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null,
            )}

            <div className="mt-8 grid gap-3 rounded-xl bg-muted/60 p-5 sm:grid-cols-2">
              <Resumo label="Instalação & setup (por loja)" value={brl(totais.instalacao)} />
              <Resumo label="Mensalidade (por loja)" value={brl(totais.mensalidade)} />
              <Resumo label="Instalação total" value={brl(totais.instalacaoTotal)} />
              <Resumo label="Mensalidade total" value={brl(totais.mensalidadeTotal)} />
              <div className="sm:col-span-2 border-t border-border pt-3">
                <Resumo
                  strong
                  label={`Valor total do contrato (${totais.meses} meses)`}
                  value={brl(totais.contratoTotal)}
                />
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Proposta válida por 15 dias. Valores sujeitos a aprovação comercial.
            </p>
          </div>

          <div className="no-print mt-6 flex flex-wrap justify-between gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              Voltar
            </Button>
            <Button onClick={() => window.print()}>
              <Download className="size-4" /> Baixar PDF
            </Button>
          </div>
        </section>
      )}
    </Page>
  );
}

function AddModulo({
  options,
  onAdd,
}: {
  options: ItemCatalogo[];
  onAdd: (id: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="h-9 w-56">
          <SelectValue placeholder="Escolher módulo" />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>
              {o.nome} — {brl(o.preco)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        size="sm"
        variant="secondary"
        disabled={!value}
        onClick={() => {
          onAdd(value);
          setValue("");
        }}
      >
        <Plus className="size-4" /> Adicionar módulo
      </Button>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm font-bold">{value}</dd>
    </div>
  );
}

function Resumo({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn("text-sm", strong ? "font-bold" : "text-muted-foreground")}>{label}</span>
      <span className={cn("font-bold", strong ? "text-lg text-primary" : "text-sm")}>{value}</span>
    </div>
  );
}
