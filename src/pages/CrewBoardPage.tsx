import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Phone, Mail, HardHat } from "lucide-react";

const crew = [
  { id: 1, name: "John Martinez", role: "Project Manager", status: "on-site", phone: "555-0101", email: "john@buildtrack.com", project: "Riverside Tower" },
  { id: 2, name: "Sarah Chen", role: "Site Supervisor", status: "on-site", phone: "555-0102", email: "sarah@buildtrack.com", project: "Maple Residences" },
  { id: 3, name: "Mike Ross", role: "Foreman", status: "off-duty", phone: "555-0103", email: "mike@buildtrack.com", project: "Riverside Tower" },
  { id: 4, name: "Lisa Thompson", role: "Safety Officer", status: "on-site", phone: "555-0104", email: "lisa@buildtrack.com", project: "Commerce Plaza" },
  { id: 5, name: "David Park", role: "Engineer", status: "off-duty", phone: "555-0105", email: "david@buildtrack.com", project: "Greenfield School" },
  { id: 6, name: "Robert Kim", role: "Estimator", status: "on-site", phone: "555-0106", email: "robert@buildtrack.com", project: "Commerce Plaza" },
  { id: 7, name: "Emily Davis", role: "Electrician", status: "on-site", phone: "555-0107", email: "emily@buildtrack.com", project: "Maple Residences" },
  { id: 8, name: "James Wilson", role: "Plumber", status: "off-duty", phone: "555-0108", email: "james@buildtrack.com", project: "Riverside Tower" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "on-site": "default",
  "off-duty": "secondary",
  "leave": "destructive",
};

export default function CrewBoardPage() {
  const [search, setSearch] = useState("");

  const filtered = crew.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crew Board</h1>
          <p className="text-muted-foreground">Manage your construction crew</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search crew members..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <HardHat className="h-5 w-5 text-primary" />
                </div>
                <Badge variant={statusVariant[member.status] ?? "outline"}>{member.status}</Badge>
              </div>
              <CardTitle className="text-base mt-2">{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground">{member.project}</p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{member.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
