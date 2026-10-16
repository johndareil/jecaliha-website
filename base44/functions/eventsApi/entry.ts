import { fetchEvents } from "../../shared/events.ts";

// Read-only proxy for the public events gallery: reads the events/ folders from
// R2 and returns only the events that actually exist, newest first.

export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}) as any);
    const action = String(body?.action ?? "list-events");

    if (action !== "list-events") {
      return Response.json({ error: "Invalid action" }, { status: 400 });
    }

    const events = await fetchEvents();
    return Response.json({ events });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}