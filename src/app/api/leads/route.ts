import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* ── Zod Schemas ── */
const PriceRequestSchema = z.object({
  type:        z.literal("price_request"),
  propertyId:  z.string().min(1).max(50),
  name:        z.string().min(2).max(100).trim(),
  mobile:      z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  requirement: z.string().max(500).optional(),
});

const PropertyWantedSchema = z.object({
  type:    z.literal("property_wanted"),
  name:    z.string().min(2).max(100).trim(),
  mobile:  z.string().regex(/^[6-9]\d{9}$/),
  area:    z.string().max(100).optional(),
  budget:  z.string().max(50).optional(),
  purpose: z.string().max(50).optional(),
});

const SellerListingSchema = z.object({
  type:         z.literal("seller_listing"),
  name:         z.string().min(2).max(100).trim(),
  mobile:       z.string().regex(/^[6-9]\d{9}$/),
  propertyType: z.string().max(50).optional(),
});

const LeadSchema = z.discriminatedUnion("type", [
  PriceRequestSchema,
  PropertyWantedSchema,
  SellerListingSchema,
]);

export async function POST(req: NextRequest) {
  try {
    /* Parse body */
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    /* Validate */
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const lead = parsed.data;

    /*
      TODO: Persist lead to your database, e.g.:
      await db.leads.create({ data: { ...lead, ip: req.ip, createdAt: new Date() } });

      TODO: Send WhatsApp notification via API:
      await sendWhatsApp({ to: process.env.ADMIN_WHATSAPP, data: lead });
    */

    console.log("[LEAD]", JSON.stringify(lead));

    return NextResponse.json(
      { success: true, message: "Lead received. We will contact you shortly." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[LEADS API ERROR]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* Reject non-POST */
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
