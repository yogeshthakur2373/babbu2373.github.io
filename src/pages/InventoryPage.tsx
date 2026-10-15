import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";
import { Search, Package, AlertTriangle, Plus, Minus } from "lucide-react";

const inventory = [
  { id: 1, name: "Portland Cement (50kg)", category: "Materials", quantity: 240, unit: "bags", minLevel: 100, location: "Warehouse A" },
  { id: 2, name: "Rebar #4 (20ft)", category: "Materials", quantity: 85, unit: "pcs", minLevel: 50, location: "Yard B" },
  { id: 3, name: "2x4 Lumber (8ft)", category: "Materials", quantity: 320, unit: "pcs", minLevel: 200, location: "Warehouse A" },
  { id: 4, name: "Safety Helmets", category: "PPE", quantity: 45, unit: "pcs", minLevel: 60, location: "Warehouse C" },
  { id: 5, name: "Concrete Mixer", category: "Equipment", quantity: 3, unit: "units", minLevel: 2, location: "Yard A" },
  { id: 6, name: "Excavator CAT 320", category: "Equipment", quantity: 2, unit: "units", minLevel: 1, location: "Yard B" },
  { id: 7, name: "PVC Pipe 4in (10ft)", category: "Materials", quantity: 120, unit: "pcs", minLevel: 80, location: "Warehouse A" },
  { id: 8, name: "Welding Rods E7018", category: "Materials", quantity: 15, unit: "boxes", minLevel: 20, location: "Warehouse C" },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(inventory);

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const adjustQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Track materials and equipment</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search inventory..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => {
          const low = item.quantity <= item.minLevel;
          return (
            <Card key={item.id} className={low ? "border-destructive" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  {low && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Low
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base mt-2">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="text-lg font-bold">
                    {formatNumber(item.quantity)} {item.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Min: {item.minLevel}</span>
                  <span>{item.location}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => adjustQty(item.id, -1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => adjustQty(item.id, 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
