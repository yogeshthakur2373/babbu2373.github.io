import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatDate } from "@/lib/utils";
import { FileText, Search, Plus, Eye } from "lucide-react";

const reports = [
  { id: 1, title: "Daily Progress - Riverside Tower", project: "Riverside Tower", date: "2024-06-14", type: "daily", author: "Mike Ross", status: "submitted" },
  { id: 2, title: "Safety Inspection - Maple Residences", project: "Maple Residences", date: "2024-06-13", type: "safety", author: "Lisa Thompson", status: "submitted" },
  { id: 3, title: "Weekly Summary - Week 24", project: "All Projects", date: "2024-06-12", type: "weekly", author: "John Martinez", status: "submitted" },
  { id: 4, title: "Incident Report - Site B", project: "Riverside Tower", date: "2024-06-10", type: "incident", author: "Lisa Thompson", status: "under-review" },
  { id: 5, title: "Material Delivery Log", project: "Maple Residences", date: "2024-06-09", type: "log", author: "Sarah Chen", status: "submitted" },
  { id: 6, title: "Quality Control - Concrete Test", project: "Riverside Tower", date: "2024-06-08", type: "quality", author: "David Park", status: "submitted" },
];

const typeVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  daily: "secondary",
  safety: "default",
  weekly: "outline",
  incident: "destructive",
  log: "secondary",
  quality: "default",
};

export default function SiteReportPage() {
  const [search, setSearch] = useState("");

  const filtered = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.project.toLowerCase().includes(search.toLowerCase()) ||
      r.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Reports</h1>
          <p className="text-muted-foreground">View and manage construction reports</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search reports..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((report) => (
          <Card key={report.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{report.title}</h3>
                    <Badge variant={typeVariant[report.type] ?? "outline"}>{report.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {report.project} &middot; {report.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(report.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={report.status === "submitted" ? "outline" : "secondary"}>
                  {report.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-3 w-3" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
