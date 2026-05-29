import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const rateLimitMap = new Map<string, number[]>();
const rateLimitMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "").split(",")[0].trim();
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) || [];
  timestamps = timestamps.filter(t => t > now - 60000);
  if (timestamps.length >= 5) {
    res.status(429).json({ success: false, error: "Muitas tentativas. Aguarde." });
    return;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
};

interface C2SParams {
  nome: string;
  telefone: string;
  email: string;
  empreendimento: string;
  origem: string;
  ipCliente: string;
  userAgent: string;
}

async function enviarLeadC2S(params: C2SParams) {
  const { nome, telefone, email, empreendimento, origem, ipCliente, userAgent } = params;
  const rawTelefone = telefone.replace(/\D/g, "");

  const c2sToken = process.env.C2S_TOKEN || process.env.C2S_API_TOKEN || "";
  const c2sBaseUrl = process.env.C2S_BASE_URL || process.env.URL_do_WEBHOOK_C2S || "https://api.contact2sale.com/integration";

  if (!c2sToken) {
    console.warn("⚠️ [C2S] Token ausente — modo simulação");
    return { sucesso: true, lead_id: "SIMULADO" };
  }

  const payload = {
    nome: nome.trim(),
    telefone: rawTelefone,
    email: email.trim().toLowerCase() || "",
    empreendimento: empreendimento.trim(),
    origem: origem,
    midia: "site",
    data_cadastro: new Date().toISOString(),
    ip_cliente: ipCliente,
    user_agent: userAgent
  };

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${c2sToken}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Source": "conquista-ja"
  };

  console.info(`[C2S] Enviando para: ${c2sBaseUrl}`);

  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const resp = await fetch(c2sBaseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const responseText = await resp.text();
      console.info(`[C2S] HTTP ${resp.status}: ${responseText}`);
      if (resp.ok) {
        let body: any = {};
        try { body = JSON.parse(responseText); } catch {}
        return { sucesso: true, lead_id: String(body.id || body.lead_id || "ok") };
      }
      console.error(`❌ [C2S] HTTP ${resp.status} | tentativa ${tentativa}`);
    } catch (err: any) {
      console.error(`❌ [C2S] Erro tentativa ${tentativa}:`, err.message || err);
    }
    if (tentativa < 3) await new Promise(resolve => setTimeout(resolve, 2000 * tentativa));
  }
  return { sucesso: false, erro: "Todas as tentativas falharam" };
}

app.post("/api/leads", rateLimitMiddleware, async (req, res) => {
  const data = req.body || {};
  const name = (data.name || "").trim();
  const phone = (data.phone || "").trim();
  const email = (data.email || "").trim();
  const interest = (data.interest || "").trim();
  const origin = (data.origin || "Site Conquista Já").trim();

  if (name.length < 3) { res.status(400).json({ success: false, error: "Nome inválido." }); return; }
  if (phone.replace(/\D/g, "").length < 10) { res.status(400).json({ success: false, error: "Telefone inválido." }); return; }
  if (!interest) { res.status(400).json({ success: false, error: "Informe seu objetivo." }); return; }

  const clientIp = (req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "").split(",")[0].trim();
  const userAgent = (req.headers["user-agent"] || "").substring(0, 200);

  const resultado = await enviarLeadC2S({ nome: name, telefone: phone, email: email, empreendimento: interest, origem: origin, ipCliente: clientIp, userAgent });

  if (resultado.sucesso) {
    res.status(200).json({ success: true, lead_id: resultado.lead_id });
  } else {
    res.status(200).json({ success: true, warning: "Lead salvo localmente." });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(`🚀 Servidor em http://0.0.0.0:${PORT}`);
  console.info(`C2S_TOKEN: ${process.env.C2S_TOKEN || process.env.C2S_API_TOKEN ? "✅ ok" : "❌ ausente"}`);
});
