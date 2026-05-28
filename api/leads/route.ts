import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, interest, origin } = body;

    if (!name || name.trim().length < 3) {
      return NextResponse.json({ success: false, error: 'Nome inválido.' }, { status: 400 });
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ success: false, error: 'Telefone inválido.' }, { status: 400 });
    }

    const payload = {
      nome:          name.trim(),
      telefone:      phone.replace(/\D/g, ''),
      email:         email || '',
      empreendimento: interest || '',
      origem:        origin || 'Site Conquista Já',
      midia:         'site',
      data_cadastro: new Date().toISOString(),
    };

    console.log(`[LEAD] ${name} | ${phone} | ${email}`);

    const c2sRes = await fetch(`${process.env.C2S_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.C2S_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await c2sRes.json().catch(() => ({}));
    console.log(`[C2S] status=${c2sRes.status} | id=${data.id || 'N/A'}`);

    return NextResponse.json({ success: true, lead_id: data.id || 'ok' });

  } catch (err: any) {
    console.error('[ERRO]', err.message);
    return NextResponse.json({ success: true, warning: 'Lead salvo em log.' });
  }
}
