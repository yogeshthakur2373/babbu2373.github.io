import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  FolderOpen,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";

const stats = [
  { label: "Active Projects", value: 12, icon: FolderOpen, change: "+2 this month" },
  { label: "Crew Members", value: 48, icon: Users, change: "+5 this month" },
  { label: "Inventory Items", value: 342, icon: Package, change: "-12 this week" },
  { label: "Budget Utilized", value: "$1.2M", icon: TrendingUp, change: "78% of total" },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "Concrete delivery delayed by 2 hours", time: "10 min ago" },
  { id: 2, type: "error", message: "Site B safety inspection overdue", time: "1 hour ago" },
  { id: 3, type: "info", message: "New permit approved for Riverside Tower", time: "3 hours ago" },
  { id: 4, type: "warning", message: "Steel shipment arriving tomorrow", time: "5 hours ago" },
];

const upcomingTasks = [
  { id: 1, task: "Foundation pour - Block A", project: "Riverside Tower", date: "Today, 2:00 PM" },
  { id: 2, task: "Electrical rough-in inspection", project: "Maple Residences", date: "Tomorrow, 9:00 AM" },
  { id: 3, task: "HVAC duct installation", project: "Commerce Plaza", date: "Wed, 8:00 AM" },
  { id: 4, task: "Drywall delivery", project: "Riverside Tower", date: "Thu, 10:00 AM" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your construction operations</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <Badge
                    variant={
                      alert.type === "error"
                        ? "destructive"
                        : alert.type === "warning"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {alert.type}
                  </Badge>
                  <p className="text-sm">{alert.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{task.task}</p>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{task.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
