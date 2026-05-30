import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, origin } = body;
    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }
    const makeResponse = await fetch('https://hook.us2.make.com/ei6lv0p25dan241tvrjjatecaws7cqt1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, interest: interest || '', origin: origin || 'site' }),
    });
    if (!makeResponse.ok) {
      return NextResponse.json({ error: 'Erro ao enviar lead' }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Lead enviado com sucesso!' }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
