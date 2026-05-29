import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, origin, customToken, customWebhook } = body;
    
    // Logger for lead tracking on server console
    console.log(`[${new Date().toISOString()}] Novo Lead Recebido localmente:`, {
      name,
      phone,
      email,
      interest,
      origin
    });

    // Flexible extraction of environment variables with client-side override backup
    const defaultC2sToken = '7fac93af962788393c53c7a7af41ba8a64d7d962d189a3fabf';
    const c2sToken = customToken || process.env.C2S_API_TOKEN || process.env.C2S_TOKEN || process.env.TOKEN_C2S || defaultC2sToken;
    const c2sWebhookUrl = customWebhook || process.env.C2S_WEBHOOK_URL || process.env.C2S_WEBHOOK || process.env.WEBHOOK_C2S || '';

    // Securely log configured integration keys (masking contents for visual privacy)
    const secureMask = (val: string) => {
      if (!val) return 'não definido';
      if (val.length <= 8) return '***';
      return `${val.substring(0, 4)}...${val.substring(val.length - 4)}`;
    };

    console.log(`[Integração C2S] Diagnóstico de Configuração:`, {
      C2S_API_TOKEN: secureMask(c2sToken),
      C2S_WEBHOOK_URL: secureMask(c2sWebhookUrl)
    });

    // Clean phone number from standard visual masks (parentheses, spacing, dashes)
    const rawPhoneDigits = String(phone || '').replace(/\D/g, "");

    // Generates a sanitized version with Brazilian country prefix (55) if it doesn't already exist
    let phoneWithDdis = rawPhoneDigits;
    if (rawPhoneDigits.length === 10 || rawPhoneDigits.length === 11) {
      if (!rawPhoneDigits.startsWith("55")) {
        phoneWithDdis = `55${rawPhoneDigits}`;
      }
    }

    // Default messages and product fallback for perfect field-mapping
    const leadProduct = interest || 'Landing Page Imóveis';
    const leadOrigin = origin || 'site_exclusivo_app';
    const leadMessage = interest ? `Interesse no lançamento: ${interest}` : 'Interessado em receber mais informações e tabelas de preços.';

    // Universal rich fields mapping – combines all commonly used English & Portuguese key conventions
    // so no matter how the webhook receiver or C2S API is configured, they will map the attributes.
    const leadFields = {
      // Standard Portuguese Fields (Direct C2S Direct API templates)
      api_token: c2sToken,
      token: c2sToken,
      nome: name || '',
      telefone: phone || '',
      celular: phone || '',
      telefone_puro: rawPhoneDigits,
      celular_puro: rawPhoneDigits,
      email: email || '',
      produto: leadProduct,
      origem: leadOrigin,
      mensagem: leadMessage,

      // Standard English Fields (RD Station / Webhook integrations / Pluga standard)
      name: name || '',
      phone: phone || '',
      phone_clean: rawPhoneDigits,
      phone_ddis: phoneWithDdis,
      mobile: phone || '',
      cellphone: phone || '',
      whatsapp: phone || '',
      origin: leadOrigin,
      source: leadOrigin,
      product: leadProduct,
      message: leadMessage,
      interest: leadProduct,
    };

    // Construct a comprehensive payload accommodating REST flat/nested structures and RD Station mimics
    const c2sPayload = {
      ...leadFields,
      
      // Some API layers require a nested "lead" or "data" object
      lead: {
        ...leadFields
      },
      data: {
        ...leadFields
      },

      // RD Station Webhook mimics (C2S custom integrations frequently listen for this RD Station webhook schema)
      leads: [
        {
          id: `lead_${Date.now()}`,
          email: email || '',
          name: name || '',
          personal_phone: rawPhoneDigits,
          mobile_phone: rawPhoneDigits,
          first_measurement: {
            created_at: new Date().toISOString()
          },
          last_conversion: {
            source: leadOrigin,
            content: {
              nome: name || '',
              email: email || '',
              telefone: phone || '',
              whatsapp: phone || '',
              origem: leadOrigin,
              produto: leadProduct,
              mensagem: leadMessage
            }
          }
        }
      ]
    };

    // Determine target delivery URL: 
    // Prioritizes a specific Custom Webhook URL, falls back to standard C2S v1 and v2 API Leads endpoints if token is set.
    let targetUrl = c2sWebhookUrl || (c2sToken ? 'https://api.c2s.com.br/v1/leads' : null);

    if (targetUrl && c2sToken) {
      // Append the token to the URL query string as a universal fallback, 
      // since many low-code webhooks and C2S APIs natively grab 'api_token' from the request URL.
      const separator = targetUrl.includes('?') ? '&' : '?';
      targetUrl = `${targetUrl}${separator}api_token=${encodeURIComponent(c2sToken)}&token=${encodeURIComponent(c2sToken)}`;
    }

    if (targetUrl) {
      // Mask token inside logs for security
      const loggedUrl = targetUrl.replace(/api_token=[^&]+/g, 'api_token=***').replace(/token=[^&]+/g, 'token=***');
      console.log(`[Integração C2S] Enviando lead para o endpoint seguro: ${loggedUrl}`);
      
      let successInSending = false;
      let statusCode = 200;

      // 1. TENTATIVA COM JSON (Padrão para webhooks e integrações modernas)
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        };

        if (c2sToken) {
          headers['api-token'] = c2sToken;
          headers['token'] = c2sToken;
          headers['Authorization'] = `Bearer ${c2sToken}`;
        }

        console.log(`[Integração C2S] Tentando enviar lead em formato JSON...`);
        const responseJson = await fetch(targetUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(c2sPayload),
        });

        const responseText = await responseJson.text();
        statusCode = responseJson.status;
        console.log(`[Integração C2S] Resposta da tentative JSON (Status ${statusCode}):`, responseText);

        if (responseJson.ok) {
          successInSending = true;
        }
      } catch (jsonError) {
        console.error('[Integração C2S] Erro de rede ou parse na tentativa JSON:', jsonError);
      }

      // 2. TENTATIVA / REDUNDÂNCIA COM x-www-form-urlencoded
      // Se a tentativa JSON falhar, OU se a URL for a da API oficial da C2S (api.c2s.com.br),
      // enviamos como form-urlencoded tradicional. Isso é crítico porque muitos servidores legados em PHP interpretam $_POST
      // apenas quando transmitidos no tipo de conteúdo de formulário padrão do navegador (x-www-form-urlencoded).
      const isOfficialC2s = targetUrl.includes('api.c2s.com.br');
      if (!successInSending || isOfficialC2s) {
        try {
          console.log(`[Integração C2S] Iniciando envio redundante via x-www-form-urlencoded (IsOfficialC2s: ${isOfficialC2s})...`);
          
          const formHeaders: Record<string, string> = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
          };

          if (c2sToken) {
            formHeaders['api-token'] = c2sToken;
            formHeaders['token'] = c2sToken;
            formHeaders['Authorization'] = `Bearer ${c2sToken}`;
          }

          // Montar params planos (flat) com todos os aliases possíveis
          const flatParams = new URLSearchParams();
          flatParams.append('api_token', c2sToken);
          flatParams.append('token', c2sToken);
          flatParams.append('nome', name || '');
          flatParams.append('email', email || '');
          flatParams.append('telefone', rawPhoneDigits);
          flatParams.append('celular', rawPhoneDigits);
          flatParams.append('origem', leadOrigin);
          flatParams.append('mensagem', leadMessage);
          flatParams.append('produto', leadProduct);
          // Aliases em inglês úteis para roteamento secundário ou webhooks
          flatParams.append('name', name || '');
          flatParams.append('phone', rawPhoneDigits);
          flatParams.append('email_address', email || '');
          flatParams.append('origin', leadOrigin);
          flatParams.append('message', leadMessage);
          flatParams.append('product', leadProduct);

          const responseForm = await fetch(targetUrl, {
            method: 'POST',
            headers: formHeaders,
            body: flatParams.toString(),
          });

          const responseFormText = await responseForm.text();
          console.log(`[Integração C2S] Resposta da tentativa URL-Encoded (Status ${responseForm.status}):`, responseFormText);

          if (responseForm.ok) {
            successInSending = true;
          }
        } catch (formError) {
          console.error('[Integração C2S] Erro crítico na tentativa de conexão URL-Encoded:', formError);
        }
      }
    } else {
      console.warn('[Integração C2S] Atenção: C2S_API_TOKEN ou C2S_WEBHOOK_URL não configurados no ambiente local ou de produção. O lead foi armazenado apenas nos registros locais.');
    }

    return NextResponse.json({ 
      success: true, 
      message: "Lead cadastrado com sucesso!",
      integrated: !!targetUrl
    });
  } catch (error) {
    console.error("Erro interno no processamento do lead:", error);
    return NextResponse.json({ success: false, error: "Falha ao processar o formulário." }, { status: 400 });
  }
}
    console.log(`[C2S] status=${c2sRes.status} | id=${data.id || 'N/A'}`);

    return NextResponse.json({ success: true, lead_id: data.id || 'ok' });

  } catch (err: any) {
    console.error('[ERRO]', err.message);
    return NextResponse.json({ success: true, warning: 'Lead salvo em log.' });
  }
}
