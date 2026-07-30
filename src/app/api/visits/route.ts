import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const VisitSchema = z.object({
  propertyId:    z.string().min(1).max(50),
  propertySlug:  z.string().min(1).max(100),
  name:          z.string().min(2).max(100).trim(),
  mobile:        z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  date:          z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  timeSlot:      z.string().min(1).max(20),
  visitorCount:  z.number().int().min(1).max(6),
});

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
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

    /* Generate a booking reference */
    const ref = `BS-${Date.now().toString(36).toUpperCase()}`;

    /*
      TODO: Save booking to database
      TODO: Send confirmation WhatsApp/SMS to buyer
      TODO: Notify BuySafe agent
    */
    console.log("[VISIT BOOKED]", { ref, ...visit });

    return NextResponse.json(
      {
        success: true,
        bookingRef: ref,
        message: `Visit confirmed for ${visit.date} at ${visit.timeSlot}. Reference: ${ref}`,
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
