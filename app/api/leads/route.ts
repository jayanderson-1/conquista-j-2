import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, origin } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const c2sToken = process.env.C2S_API_TOKEN;

    if (!c2sToken) {
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

    try {
      const c2sResponse = await fetch('https://api.contact2sale.com/integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await c2sResponse.text();
      console.log('C2S status:', c2sResponse.status, 'body:', responseText);
    } catch (fetchError) {
      console.error('Erro ao chamar C2S:', fetchError);
    }

    return NextResponse.json(
      { success: true, message: 'Lead enviado com sucesso!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
