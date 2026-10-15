import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowLeft, Edit, Calendar, MapPin, User } from "lucide-react";

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
    manager: "John Martinez",
    description:
      "A 24-story mixed-use development featuring residential units, retail space, and underground parking. Phase 1 includes foundation and structural work.",
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
    manager: "Sarah Chen",
    description:
      "Luxury townhouse community with 48 units, landscaped common areas, and a community center.",
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
    manager: "Robert Kim",
    description:
      "Multi-level retail and office complex with integrated parking structure and green roof terraces.",
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
    manager: "Lisa Thompson",
    description:
      "Structural reinforcement and deck replacement for the Harbor Bridge main span and approach ramps.",
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
    manager: "David Park",
    description:
      "New K-12 school campus with classrooms, gymnasium, auditorium, and athletic fields.",
  },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  planning: "secondary",
  "on-hold": "destructive",
  completed: "outline",
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate("/projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <p>Project not found.</p>
      </div>
    );
  }

  const progress = Math.round((project.spent / project.budget) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate(`/projects/${project.id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <Badge variant={statusVariant[project.status] ?? "outline"}>{project.status}</Badge>
        </div>
        <p className="text-muted-foreground">{project.client}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{project.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {project.location}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                {project.manager}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(project.budget)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Spent</p>
              <p className="text-xl font-semibold">{formatCurrency(project.spent)}</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
