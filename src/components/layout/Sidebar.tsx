import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  CalendarDays,
  Users,
  Package,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  HardHat,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/projects", icon: FolderOpen, label: "Projects" },
  { to: "/schedule", icon: CalendarDays, label: "Schedule" },
  { to: "/crew", icon: Users, label: "Crew" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <HardHat className="h-6 w-6 shrink-0 text-primary" />
          {open && (
            <span className="whitespace-nowrap text-lg font-bold">BuildTrack</span>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-1 hover:bg-accent"
        >
          {open ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {open && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
