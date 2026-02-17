import { NavLink, useLocation } from "react-router-dom";
import { FileText, Eye, Award } from "lucide-react";

const navItems = [
  { to: "/builder", label: "Builder", icon: FileText },
  { to: "/preview", label: "Preview", icon: Eye },
  { to: "/proof", label: "Proof", icon: Award },
];

const AppNavbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
      <NavLink to="/" className="flex items-center gap-2">
        <span className="text-primary font-mono font-bold text-sm">⚡</span>
        <span className="font-semibold text-foreground text-sm tracking-tight">AI Resume Builder</span>
      </NavLink>

      {!isHome && (
        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </NavLink>
            );
          })}
        </div>
      )}

      <div className="text-[10px] font-mono text-muted-foreground/60">
        KodNest Premium
      </div>
    </nav>
  );
};

export default AppNavbar;
