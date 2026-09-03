import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  FileText,
  Gamepad2,
  Home,
  Layers,
  Menu,
  Users,
  X,
  ClipboardList,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/conhecimento", label: "Conhecimento", icon: BookOpen },
  { to: "/proposta", label: "Proposta", icon: FileText },
  { to: "/calculadora", label: "Calculadora", icon: Calculator },
  { to: "/deep-dive", label: "Deep Dive", icon: Layers },
  { to: "/pre-vendas", label: "Pré-Vendas", icon: ClipboardList },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/gamificacao", label: "Gamificação", icon: Gamepad2 },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-sidebar px-4 py-3 text-sidebar-foreground lg:hidden">
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-1.5 hover:bg-sidebar-accent"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <span className="text-sm font-bold">Caixa de Ferramentas 3S Checkout</span>
      </header>

      <div className="flex">
        <aside
          className={cn(
            "no-print fixed inset-y-0 left-0 z-50 w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-0 lg:flex lg:h-screen lg:translate-x-0",
            open ? "flex translate-x-0" : "hidden -translate-x-full",
          )}
        >
          <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sm font-extrabold text-sidebar-primary-foreground">
              3S
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold">Caixa de Ferramentas</p>
              <p className="text-xs text-sidebar-foreground/70">3S Checkout</p>
            </div>
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="ml-auto rounded-md p-1 hover:bg-sidebar-accent lg:hidden"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-foreground/60">
            Uso comercial interno · 2026
          </div>
        </aside>

        {open && (
          <div
            className="no-print fixed inset-0 z-40 bg-foreground/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="no-print mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>;
}
