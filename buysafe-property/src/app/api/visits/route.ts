import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VisitSchema = z.object({
  propertyId:    z.union([z.string(), z.number()]),
  propertySlug:  z.string().optional(),
  name:          z.string().min(2).max(100).trim(),
  mobile:        z.string().regex(/^[0-9]{10}$/, "Invalid Indian mobile number"),
  date:          z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  timeSlot:      z.string().min(1).max(20).optional(),
  visitorCount:  z.number().int().min(1).max(6).optional(),
});

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = VisitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const visit = parsed.data;

    /* Validate date is not in the past */
    const visitDate = new Date(visit.date);
    const today     = new Date();
    today.setHours(0, 0, 0, 0);
    if (visitDate < today) {
      return NextResponse.json({ error: "Visit date cannot be in the past" }, { status: 400 });
    }

    /* Convert date to datetime string for backend */
    let backendDate = new Date(visit.date);
    if (visit.timeSlot) {
      // Very rough parsing for demonstration. e.g., '10:00 AM'
      const timeMatch = visit.timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (timeMatch) {
        let [_, h, m, ampm] = timeMatch;
        let hours = parseInt(h);
        if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
        backendDate.setHours(hours, parseInt(m), 0, 0);
      }
    }

    const backendData = {
      name: visit.name,
      email: body.email || "no-email@example.com",
      phone: visit.mobile,
      scheduled_date: backendDate.toISOString(),
      property_id: typeof visit.propertyId === 'string' ? parseInt(visit.propertyId.replace(/\D/g,'')) || 1 : visit.propertyId
    };

    const response = await fetch(`${BACKEND_URL}/api/v1/visits/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      console.error("[VISITS API] Backend failed:", await response.text());
      return NextResponse.json(
        { error: "Failed to submit visit to backend" },
        { status: 502 }
      );
    }

    const data = await response.json();

    /* Generate a booking reference for the user */
    const ref = `BS-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        bookingRef: ref,
        message: `Visit confirmed for ${visit.date}. Reference: ${ref}`,
        data
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[VISITS API ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
