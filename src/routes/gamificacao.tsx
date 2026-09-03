import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, RotateCcw, Timer, X } from "lucide-react";
import { Page, PageHeader } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useObjecoes, useQuiz } from "@/hooks/use-api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gamificacao")({
  head: () => ({
    meta: [
      { title: "Gamificação — Quiz 3S e Desafio de Objeções" },
      {
        name: "description",
        content:
          "Treine o time comercial com o Quiz 3S e o Desafio de Objeções cronometrado do 3S Checkout.",
      },
      { property: "og:title", content: "Gamificação — 3S Checkout" },
      {
        property: "og:description",
        content: "Quiz de produto e desafio de objeções com cronômetro para o time de vendas.",
      },
    ],
  }),
  component: Gamificacao,
});

function Gamificacao() {
  return (
    <Page>
      <PageHeader
        title="Gamificação"
        subtitle="Treine argumentação e conhecimento de produto antes de entrar na reunião."
      />
      <Tabs defaultValue="quiz">
        <TabsList>
          <TabsTrigger value="quiz">Quiz 3S</TabsTrigger>
          <TabsTrigger value="objecoes">Desafio de Objeções</TabsTrigger>
        </TabsList>
        <TabsContent value="quiz" className="mt-6">
          <Quiz />
        </TabsContent>
        <TabsContent value="objecoes" className="mt-6">
          <Objecoes />
        </TabsContent>
      </Tabs>
    </Page>
  );
}

function Quiz() {
  const { data, isLoading } = useQuiz();
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);

  if (isLoading || !data) return <Skeleton className="h-64 rounded-2xl" />;

  const total = data.length;
  const q = data[i]!;

  const responder = (idx: number) => {
    if (escolha !== null) return;
    setEscolha(idx);
    if (idx === q.correta) setAcertos((a) => a + 1);
  };

  const proxima = () => {
    if (i + 1 >= total) setFim(true);
    else setI(i + 1);
    setEscolha(null);
  };

  const reiniciar = () => {
    setI(0);
    setEscolha(null);
    setAcertos(0);
    setFim(false);
  };

  if (fim)
    return (
      <Resultado
        titulo="Quiz concluído"
        acertos={acertos}
        total={total}
        onReiniciar={reiniciar}
      />
    );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>
          Pergunta {i + 1} de {total}
        </span>
        <span>{acertos} acertos</span>
      </div>
      <Progress value={((i + (escolha !== null ? 1 : 0)) / total) * 100} className="mt-2" />

      <h2 className="mt-5 text-lg font-bold">{q.pergunta}</h2>

      <div className="mt-4 space-y-2.5">
        {q.opcoes.map((o, idx) => (
          <Opcao
            key={o}
            texto={o}
            estado={
              escolha === null
                ? "idle"
                : idx === q.correta
                  ? "correta"
                  : idx === escolha
                    ? "errada"
                    : "neutra"
            }
            onClick={() => responder(idx)}
          />
        ))}
      </div>

      {escolha !== null && (
        <div className="mt-5 rounded-xl bg-muted/60 p-4 text-sm">
          <p className="font-bold">
            {escolha === q.correta ? "Resposta correta!" : "Não foi dessa vez."}
          </p>
          <p className="mt-1 text-muted-foreground">{q.explicacao}</p>
          <Button className="mt-4" onClick={proxima}>
            {i + 1 >= total ? "Ver resultado" : "Próxima pergunta"}
          </Button>
        </div>
      )}
    </div>
  );
}

const TEMPO = 30;

function Objecoes() {
  const { data, isLoading } = useObjecoes();
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);
  const [seg, setSeg] = useState(TEMPO);

  const travado = escolha !== null || seg === 0;

  useEffect(() => {
    if (fim || travado) return;
    const t = setInterval(() => setSeg((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [fim, travado, i]);

  if (isLoading || !data) return <Skeleton className="h-64 rounded-2xl" />;

  const total = data.length;
  const o = data[i]!;

  const responder = (idx: number) => {
    if (travado) return;
    setEscolha(idx);
    if (idx === o.correta) setAcertos((a) => a + 1);
  };

  const proxima = () => {
    if (i + 1 >= total) setFim(true);
    else setI(i + 1);
    setEscolha(null);
    setSeg(TEMPO);
  };

  const reiniciar = () => {
    setI(0);
    setEscolha(null);
    setAcertos(0);
    setFim(false);
    setSeg(TEMPO);
  };

  if (fim)
    return (
      <Resultado
        titulo="Desafio concluído"
        acertos={acertos}
        total={total}
        onReiniciar={reiniciar}
      />
    );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold text-muted-foreground">
          Objeção {i + 1} de {total} · {acertos} acertos
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold",
            seg <= 10 ? "bg-primary/15 text-primary" : "bg-muted text-foreground",
          )}
        >
          <Timer className="size-4" /> {seg}s
        </span>
      </div>
      <Progress value={(seg / TEMPO) * 100} className="mt-2" />

      <h2 className="mt-5 text-lg font-bold">{o.objecao}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Qual é a melhor resposta?</p>

      <div className="mt-4 space-y-2.5">
        {o.opcoes.map((op, idx) => (
          <Opcao
            key={op}
            texto={op}
            estado={
              !travado
                ? "idle"
                : idx === o.correta
                  ? "correta"
                  : idx === escolha
                    ? "errada"
                    : "neutra"
            }
            onClick={() => responder(idx)}
          />
        ))}
      </div>

      {travado && (
        <div className="mt-5 rounded-xl bg-muted/60 p-4 text-sm">
          <p className="font-bold">
            {escolha === null
              ? "Tempo esgotado!"
              : escolha === o.correta
                ? "Boa! Resposta ideal."
                : "Resposta fraca — veja o porquê."}
          </p>
          <p className="mt-1 text-muted-foreground">{o.explicacao}</p>
          <Button className="mt-4" onClick={proxima}>
            {i + 1 >= total ? "Ver resultado" : "Próxima objeção"}
          </Button>
        </div>
      )}
    </div>
  );
}

function Opcao({
  texto,
  estado,
  onClick,
}: {
  texto: string;
  estado: "idle" | "correta" | "errada" | "neutra";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={estado !== "idle"}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors",
        estado === "idle" && "border-border bg-background hover:border-primary/50 hover:bg-muted/60",
        estado === "correta" && "border-success bg-success/10 font-semibold",
        estado === "errada" && "border-primary bg-primary/10",
        estado === "neutra" && "border-border bg-background opacity-60",
      )}
    >
      {estado === "correta" && <Check className="mt-0.5 size-4 shrink-0 text-success" />}
      {estado === "errada" && <X className="mt-0.5 size-4 shrink-0 text-primary" />}
      <span>{texto}</span>
    </button>
  );
}

function Resultado({
  titulo,
  acertos,
  total,
  onReiniciar,
}: {
  titulo: string;
  acertos: number;
  total: number;
  onReiniciar: () => void;
}) {
  const pct = Math.round((acertos / total) * 100);
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
      <h2 className="text-xl font-extrabold">{titulo}</h2>
      <p className="mt-2 text-5xl font-extrabold text-primary">{pct}%</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Você acertou {acertos} de {total}.
      </p>
      <Button className="mt-6" onClick={onReiniciar}>
        <RotateCcw className="size-4" /> Jogar novamente
      </Button>
    </div>
  );
}
