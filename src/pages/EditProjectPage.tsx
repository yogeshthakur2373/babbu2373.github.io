import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
    id: "1",
    name: "Riverside Tower",
    client: "Apex Development Corp",
    status: "active",
    budget: "2500000",
    startDate: "2024-01-15",
    endDate: "2025-06-30",
    location: "Downtown District",
    manager: "John Martinez",
    description: "A 24-story mixed-use development featuring residential units, retail space, and underground parking.",
  },
  {
    id: "2",
    name: "Maple Residences",
    client: "Maple Homes LLC",
    status: "active",
    budget: "1200000",
    startDate: "2024-03-01",
    endDate: "2025-01-15",
    location: "Suburban Heights",
    manager: "Sarah Chen",
    description: "Luxury townhouse community with 48 units, landscaped common areas, and a community center.",
  },
];

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const existing = projects.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    client: existing?.client ?? "",
    status: existing?.status ?? "planning",
    budget: existing?.budget ?? "",
    startDate: existing?.startDate ?? "",
    endDate: existing?.endDate ?? "",
    location: existing?.location ?? "",
    manager: existing?.manager ?? "",
    description: existing?.description ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/projects/${id}`);
  };

  if (!existing) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate("/projects")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(`/projects/${id}`)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update project details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" name="client" value={form.client} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select id="status" name="status" value={form.status} onChange={handleChange}>
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" name="budget" type="number" value={form.budget} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={form.location} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Project Manager</Label>
                <Input id="manager" name="manager" value={form.manager} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={form.description} onChange={handleChange} rows={4} />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate(`/projects/${id}`)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
