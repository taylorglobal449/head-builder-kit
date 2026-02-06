import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
  type: "in-store" | "online" | "sale";
}

// ── Easy-to-edit event list ──────────────────────────────────────────
// To add/remove events just edit this array. Dates are YYYY-MM-DD format.
const EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Milwaukee Tool Demo Day",
    date: "2026-02-14",
    time: "10:00 AM – 2:00 PM PST",
    location: "Redding Store – 3721 Electro Way",
    description:
      "Hands-on demos of the newest M18 FUEL lineup. Milwaukee reps on-site with exclusive show specials and free swag for attendees.",
    type: "in-store",
  },
  {
    id: "2",
    title: "DeWalt 20V MAX Trade-In Event",
    date: "2026-02-21",
    time: "9:00 AM – 4:00 PM PST",
    location: "Redding Store – 3721 Electro Way",
    description:
      "Bring in any old cordless tool (any brand) and get up to $50 off a new DeWalt 20V MAX kit. Limited quantities available.",
    type: "in-store",
  },
  {
    id: "3",
    title: "Live Webinar: Fastener Selection 101",
    date: "2026-02-18",
    time: "12:00 PM – 1:00 PM PST",
    location: "Online – Zoom",
    description:
      "Join our fastener experts for a free webinar covering anchor selection, shear vs. tension loads, and code-compliant installations.",
    type: "online",
  },
  {
    id: "4",
    title: "Spring Clearance Kickoff",
    date: "2026-03-01",
    time: "All Day",
    location: "Online & In-Store",
    description:
      "Up to 40% off overstock and closeout items across power tools, hand tools, and accessories. While supplies last.",
    type: "sale",
  },
  {
    id: "5",
    title: "Knipex Pliers Workshop",
    date: "2026-03-07",
    time: "11:00 AM – 1:00 PM PST",
    location: "Redding Store – 3721 Electro Way",
    description:
      "Learn pro techniques with Knipex pliers. Try the full lineup and score workshop-only pricing on select sets.",
    type: "in-store",
  },
  {
    id: "6",
    title: "Diablo Blades Cutting Demo",
    date: "2026-03-14",
    time: "10:00 AM – 12:00 PM PST",
    location: "Redding Store – 3721 Electro Way",
    description:
      "See the difference Diablo blades make. Live cutting demos on wood, metal, and composite materials.",
    type: "in-store",
  },
];

const TYPE_COLORS: Record<string, string> = {
  "in-store": "bg-blue-100 text-blue-800",
  online: "bg-emerald-100 text-emerald-800",
  sale: "bg-header-primary/10 text-header-primary",
};

const TYPE_LABELS: Record<string, string> = {
  "in-store": "In-Store",
  online: "Online",
  sale: "Sale",
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function EventsPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    EVENTS.forEach((e) => {
      (map[e.date] ??= []).push(e);
    });
    return map;
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const selectedEvents = selectedDate ? eventsByDate[selectedDate] ?? [] : [];

  // Upcoming events (from today forward, sorted)
  const upcoming = useMemo(
    () =>
      EVENTS.filter((e) => e.date >= todayKey)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 4),
    [todayKey],
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-foreground mb-2 uppercase tracking-wide">
          Events & Calendar
        </h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Tool demos, workshops, sales events, and webinars — check out what's coming up at Fasteners&nbsp;Inc.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Calendar ─────────────────────────────────── */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4 md:p-6">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={prev}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <Button variant="ghost" size="icon" onClick={next}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-muted-foreground mb-1">
              {DAY_NAMES.map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells before 1st */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const key = toDateKey(viewYear, viewMonth, day);
                const isToday = key === todayKey;
                const hasEvents = !!eventsByDate[key];
                const isSelected = key === selectedDate;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : key)}
                    className={cn(
                      "aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all relative",
                      isToday && "ring-2 ring-header-primary font-bold",
                      isSelected && "bg-header-primary text-white",
                      !isSelected && hasEvents && "bg-header-primary/10 font-semibold",
                      !isSelected && !hasEvents && "hover:bg-muted",
                    )}
                  >
                    {day}
                    {hasEvents && !isSelected && (
                      <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-header-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected-date detail panel */}
            {selectedDate && (
              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground text-sm uppercase">
                    {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedDate(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {selectedEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events scheduled for this day.</p>
                ) : (
                  <div className="space-y-4">
                    {selectedEvents.map((ev) => (
                      <EventCard key={ev.id} event={ev} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Upcoming sidebar ─────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground uppercase text-sm tracking-wide">Upcoming Events</h3>
            {upcoming.length === 0 && (
              <p className="text-sm text-muted-foreground">No upcoming events right now — check back soon!</p>
            )}
            {upcoming.map((ev) => (
              <button
                key={ev.id}
                onClick={() => {
                  const d = new Date(ev.date + "T12:00:00");
                  setViewYear(d.getFullYear());
                  setViewMonth(d.getMonth());
                  setSelectedDate(ev.date);
                }}
                className="w-full text-left bg-card border border-border rounded-lg p-4 hover:border-header-primary transition-colors"
              >
                <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded", TYPE_COLORS[ev.type])}>
                  {TYPE_LABELS[ev.type]}
                </span>
                <h4 className="font-bold text-foreground text-sm mt-2">{ev.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(ev.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {ev.time}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {ev.location}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded", TYPE_COLORS[event.type])}>
          {TYPE_LABELS[event.type]}
        </span>
        <h4 className="font-bold text-foreground text-sm">{event.title}</h4>
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-2">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{event.description}</p>
    </div>
  );
}
