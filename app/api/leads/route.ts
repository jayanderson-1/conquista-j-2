import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, origin } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const c2sToken = process.env.C2S_API_TOKEN;

    const payload = { token: c2sToken, name, phone, email, interest: interest || '', origin: origin || 'site' };

    const c2sResponse = await fetch('https://api.contact2sale.com/integration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseText = await c2sResponse.text();

    return NextResponse.json({
      success: c2sResponse.ok,
      status: c2sResponse.status,
      c2sResponse: responseText,
    }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
