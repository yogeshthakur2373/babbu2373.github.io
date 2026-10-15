import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Search, ArrowRight } from "lucide-react";

const projects = [
  {
    id: "1",
    name: "Riverside Tower",
    client: "Apex Development Corp",
    status: "active",
    budget: 2500000,
    spent: 1800000,
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    location: "Downtown District",
  },
  {
    id: "2",
    name: "Maple Residences",
    client: "Maple Homes LLC",
    status: "active",
    budget: 1200000,
    spent: 450000,
    startDate: "2024-03-01",
    endDate: "2025-01-15",
    location: "Suburban Heights",
  },
  {
    id: "3",
    name: "Commerce Plaza",
    client: "Metro Retail Group",
    status: "planning",
    budget: 5000000,
    spent: 120000,
    startDate: "2024-08-01",
    endDate: "2026-02-28",
    location: "Business District",
  },
  {
    id: "4",
    name: "Harbor Bridge Repair",
    client: "City Infrastructure Dept",
    status: "on-hold",
    budget: 800000,
    spent: 320000,
    startDate: "2023-09-01",
    endDate: "2024-12-31",
    location: "Harbor Area",
  },
  {
    id: "5",
    name: "Greenfield School",
    client: "Greenfield School Board",
    status: "completed",
    budget: 3500000,
    spent: 3480000,
    startDate: "2022-06-01",
    endDate: "2024-05-30",
    location: "Greenfield Township",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  planning: "secondary",
  "on-hold": "destructive",
  completed: "outline",
};

export default function ProjectListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your construction projects</p>
        </div>
        <Button onClick={() => navigate("/projects/create")}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer transition-colors hover:bg-accent/50"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  <Badge variant={statusVariant[project.status] ?? "outline"}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{project.client}</p>
                <p className="text-xs text-muted-foreground">{project.location}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium">{formatCurrency(project.budget)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(project.spent)} spent
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </p>
              </div>
              <ArrowRight className="ml-4 h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
