import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, origin } = body;
    
    // Log do lead localmente no console do servidor
    console.log(`[${new Date().toISOString()}] Novo Lead Recebido:`, body);

    const c2sToken = process.env.C2S_API_TOKEN;
    const c2sWebhookUrl = process.env.C2S_WEBHOOK_URL;

    // Criamos o objeto de lead formatado seguindo padrões comuns da API C2S (Contact2Sale)
    // Suporta tanto formato direto plano (flat) quanto aninhado para garantir compatibilidade
    const c2sPayload = {
      api_token: c2sToken || '',
      nome: name || '',
      telefone: phone || '',
      email: email || '',
      produto: interest || 'Landing Page Imóveis',
      origem: origin || 'Landing Page - Site',
      mensagem: interest ? `Interesse no lançamento: ${interest}` : 'Interessado em receber mais informações.',
      lead: {
        nome: name || '',
        telefone: phone || '',
        email: email || '',
        produto: interest || 'Landing Page Imóveis',
        origem: origin || 'Landing Page - Site',
        mensagem: interest ? `Interesse no lançamento: ${interest}` : 'Interessado em receber mais informações.'
      }
    };

    // Define qual URL utilizar: se houver webhook customizado ou se houver token padrão da API C2S
    // se houver C2S_API_TOKEN mas não C2S_WEBHOOK_URL, usamos a URL oficial da API v1 de Leads da C2S
    const targetUrl = c2sWebhookUrl || (c2sToken ? 'https://api.c2s.com.br/v1/leads' : null);

    if (targetUrl) {
      console.log(`Enviando lead para o endpoint C2S: ${targetUrl}`);
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (c2sToken) {
          headers['api-token'] = c2sToken;
          headers['Authorization'] = `Bearer ${c2sToken}`;
        }

        const response = await fetch(targetUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(c2sPayload),
        });

        const responseText = await response.text();
        console.log(`Resposta da API C2S (Status ${response.status}): ${responseText}`);
        
        if (!response.ok) {
          console.warn(`Alerta: Falha ao enviar para o C2S (Status ${response.status})`);
        }
      } catch (apiError) {
        console.error('Erro de conexão ou envio ao C2S:', apiError);
        // Não barramos o retorno positivo para o cliente final para não gerar frustração, 
        // já que o lead foi capturado e logado no console do servidor.
      }
    } else {
      console.log('Integração C2S não configurada. (Defina C2S_API_TOKEN ou C2S_WEBHOOK_URL nas variáveis de ambiente). Lead logado localmente.');
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead cadastrado com sucesso!",
      integrated: !!targetUrl
    });
  } catch (error) {
    console.error("Erro no processamento do lead:", error);
    return NextResponse.json({ success: false, error: "Falha ao processar o formulário." }, { status: 400 });
  }
}
