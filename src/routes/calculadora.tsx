import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, TrendingUp, Wallet, Percent, Building2 } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMarcas } from "@/hooks/use-api";
import { brl, num } from "@/lib/format";

export const Route = createFileRoute("/calculadora")({
  head: () => ({
    meta: [
      { title: "Calculadora comercial — 3S Checkout" },
      {
        name: "description",
        content:
          "Simule GMV, desconto, número de lojas e mensalidade para estimar receita e payback da rede.",
      },
      { property: "og:title", content: "Calculadora comercial — 3S Checkout" },
      {
        property: "og:description",
        content: "Simulador de mensalidade, receita anual e take rate do 3S Checkout.",
      },
    ],
  }),
  component: Calculadora,
});

function Calculadora() {
  const { data: marcas } = useMarcas();
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState(false);
  const [gmv, setGmv] = useState("250000");
  const [desconto, setDesconto] = useState("10");
  const [lojas, setLojas] = useState("5");
  const [mensalidade, setMensalidade] = useState("189");

  const sugestoes = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return [];
    return (marcas ?? []).filter((m) => m.nome.toLowerCase().includes(q)).slice(0, 6);
  }, [busca, marcas]);

  const r = useMemo(() => {
    const g = Number(gmv) || 0;
    const d = Number(desconto) || 0;
    const l = Math.max(1, Number(lojas) || 1);
    const m = Number(mensalidade) || 0;
    const mensalidadeLiquida = m * (1 - d / 100);
    const receitaMensal = mensalidadeLiquida * l;
    return {
      mensalidadeLiquida,
      receitaMensal,
      receitaAnual: receitaMensal * 12,
      takeRate: g * l > 0 ? (receitaMensal / (g * l)) * 100 : 0,
      gmvRede: g * l,
      descontoMensal: m * l * (d / 100),
    };
  }, [gmv, desconto, lojas, mensalidade]);

  return (
    <Page>
      <PageHeader
        title="Calculadora"
        subtitle="Simule o cenário financeiro da rede a partir do GMV e da mensalidade negociada."
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <Label htmlFor="marca">Buscar marca</Label>
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="marca"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setAberto(true);
            }}
            onFocus={() => setAberto(true)}
            onBlur={() => setTimeout(() => setAberto(false), 150)}
            placeholder="Digite o nome da marca…"
            className="pl-9"
            autoComplete="off"
          />
          {aberto && sugestoes.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lift">
              {sugestoes.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-muted"
                    onMouseDown={() => {
                      setBusca(m.nome);
                      setGmv(String(m.gmvMedio));
                      setLojas(String(m.lojas));
                      setMensalidade(String(m.mensalidade));
                      setAberto(false);
                    }}
                  >
                    <span className="font-semibold">{m.nome}</span>
                    <span className="text-xs text-muted-foreground">
                      {m.lojas} lojas · {brl(m.mensalidade)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Campo label="GMV mensal por loja (R$)" value={gmv} onChange={setGmv} />
          <Campo label="Desconto (%)" value={desconto} onChange={setDesconto} />
          <Campo label="Nº de lojas" value={lojas} onChange={setLojas} />
          <Campo label="Mensalidade por loja (R$)" value={mensalidade} onChange={setMensalidade} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Resultado
          icon={Wallet}
          label="Mensalidade líquida / loja"
          value={brl(r.mensalidadeLiquida)}
          hint={`Desconto aplicado: ${brl(r.descontoMensal)}/mês na rede`}
        />
        <Resultado
          icon={TrendingUp}
          label="Receita mensal da rede"
          value={brl(r.receitaMensal)}
          hint={`${num(Math.max(1, Number(lojas) || 1))} lojas`}
        />
        <Resultado icon={Building2} label="GMV total da rede" value={brl(r.gmvRede)} hint="Base mensal" />
        <Resultado
          icon={Percent}
          label="Receita anual"
          value={brl(r.receitaAnual)}
          hint={`Take rate: ${r.takeRate.toFixed(2)}% do GMV`}
        />
      </div>
    </Page>
  );
}

function Campo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5"
      />
    </div>
  );
}

function Resultado({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <p className="mt-3 text-xs font-semibold text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 text-xl font-extrabold text-primary">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
