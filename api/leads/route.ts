import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, telefone, email, regiao } = body;

    if (!nome || !telefone || !email) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const c2sToken = process.env.C2S_API_TOKEN;
    const c2sWebhookUrl = process.env.C2S_WEBHOOK_URL || 'https://api.contact2sale.com/integration';

    if (!c2sToken) {
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

    const payload = {
      token: c2sToken,
      nome,
      telefone,
      email,
      regiao: regiao || '',
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
      return NextResponse.json(
        { error: 'Erro ao enviar lead' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Lead enviado com sucesso!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
