import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, origin } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando: nome, telefone, email' },
        { status: 400 }
      );
    }

    const c2sToken = process.env.C2S_API_TOKEN;
    const c2sWebhookUrl = process.env.C2S_WEBHOOK_URL || 'https://api.contact2sale.com/integration';

    if (!c2sToken) {
      console.error('C2S_API_TOKEN não configurado');
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

    const payload = {
      token: c2sToken,
      name,
      phone,
      email,
      interest: interest || '',
      origin: origin || 'site',
    };

    const c2sResponse = await fetch(c2sWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${c2sToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!c2sResponse.ok) {
      const errorData = await c2sResponse.json().catch(() => ({}));
      console.error('Erro na resposta do C2S:', c2sResponse.status, errorData);
      return NextResponse.json(
        { error: 'Erro ao enviar lead para o sistema' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Lead enviado com sucesso!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro inesperado na rota de leads:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
