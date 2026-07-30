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
  type:         z.literal("seller"),
  name:         z.string().min(2).max(100).trim(),
  phone:        z.string().regex(/^[0-9]{10}$/),
  details:      z.string().optional(),
});

const LeadSchema = z.discriminatedUnion("type", [
  PriceRequestSchema,
  PropertyWantedSchema,
  SellerListingSchema,
]);

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    /* Parse body */
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    /* Support legacy schemas or new ones */
    // If it's the seller form, it sends: { type: "seller", name, phone, details }
    
    // Normalize properties
    const backendData = {
      name: body.name,
      email: body.email || "no-email@example.com", // Backend requires email
      phone: body.phone || body.mobile,
      source: body.type,
      property_id: null,
    };

    if (body.propertyId && !isNaN(Number(body.propertyId))) {
       backendData.property_id = Number(body.propertyId);
    }

    const response = await fetch(`${BACKEND_URL}/api/v1/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      console.error("[LEADS API] Backend failed:", await response.text());
      return NextResponse.json(
        { error: "Failed to submit lead to backend" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { success: true, message: "Lead received. We will contact you shortly.", data },
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
