import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const scheduleData = [
  { id: 1, task: "Foundation inspection", project: "Riverside Tower", date: "2024-06-15", status: "scheduled", assignee: "Mike Ross" },
  { id: 2, task: "Steel beam delivery", project: "Riverside Tower", date: "2024-06-16", status: "scheduled", assignee: "Warehouse" },
  { id: 3, task: "Electrical rough-in", project: "Maple Residences", date: "2024-06-17", status: "in-progress", assignee: "Team B" },
  { id: 4, task: "Plumbing pressure test", project: "Maple Residences", date: "2024-06-18", status: "scheduled", assignee: "Team C" },
  { id: 5, task: "Site safety audit", project: "Commerce Plaza", date: "2024-06-19", status: "scheduled", assignee: "Safety Officer" },
  { id: 6, task: "Concrete pour - Level 3", project: "Riverside Tower", date: "2024-06-20", status: "scheduled", assignee: "Team A" },
  { id: 7, task: "Window installation", project: "Maple Residences", date: "2024-06-21", status: "delayed", assignee: "Team D" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  scheduled: "secondary",
  "in-progress": "default",
  delayed: "destructive",
  completed: "outline",
};

export default function SchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + weekOffset * 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  const formatISODate = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">Weekly construction schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setWeekOffset((w) => w - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[140px] text-center">
            {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
          </span>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset((w) => w + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        {weekDays.map((day) => {
          const dayStr = formatISODate(day);
          const dayTasks = scheduleData.filter((t) => t.date === dayStr);
          const isToday = dayStr === new Date().toISOString().split("T")[0];

          return (
            <Card key={dayStr} className={isToday ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">
                  {day.toLocaleDateString("en-US", { weekday: "short" })}
                </CardTitle>
                <div className={`text-lg font-bold ${isToday ? "text-primary" : ""}`}>
                  {day.getDate()}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {dayTasks.length === 0 && (
                  <p className="text-xs text-muted-foreground">No tasks</p>
                )}
                {dayTasks.map((task) => (
                  <div key={task.id} className="rounded-md border p-2 space-y-1">
                    <p className="text-xs font-medium leading-tight">{task.task}</p>
                    <p className="text-[10px] text-muted-foreground">{task.project}</p>
                    <Badge variant={statusVariant[task.status] ?? "outline"} className="text-[10px]">
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="h-4 w-4" />
            All Scheduled Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {scheduleData.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{task.task}</p>
                <p className="text-xs text-muted-foreground">
                  {task.project} &middot; {task.assignee}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{formatDate(task.date)}</span>
                <Badge variant={statusVariant[task.status] ?? "outline"}>{task.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
