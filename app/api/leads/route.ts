import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Log the lead (simulating database save or external CRM integration)
    console.log(`[${new Date().toISOString()}] New Lead Received:`, body);

    // In a real scenario with C2S_API_TOKEN:
    // const c2sToken = process.env.C2S_API_TOKEN;
    // await fetch('c2s_endpoint', { ... })

    return NextResponse.json({ success: true, message: "Lead cadastrado com sucesso!" });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json({ success: false, error: "Falha ao processar o formulário." }, { status: 400 });
  }
}
