import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";

/**
 * Arama motorları + AI arama/cevap botları için açık izin.
 *
 * AI tarafında iki tür bot var:
 *  - Arama / kullanıcı istekli getirme botları (OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
 *    Claude-User, PerplexityBot, Perplexity-User, Google-Extended): bunlara izin vermek
 *    ChatGPT, Claude, Perplexity ve Gemini cevaplarında kaynak olarak gösterilmek için gerekli.
 *  - Eğitim botları (GPTBot, ClaudeBot, CCBot vb.): siteyi tanıtım amaçlı yayınladığımız için
 *    bunları da engellemiyoruz; modellerin "Aksipal kim, ne yapar" bilgisini öğrenmesi hedefe hizmet eder.
 *
 * Kaynaklar: OpenAI bots dokümanı (developers.openai.com/api/docs/bots),
 * Anthropic crawler dokümanı (support.claude.com, makale 8896518).
 */
const disallow = ["/api/", "/_next/", "/ben-kimim"]; // ben-kimim 301 ile hakkimda'ya gider

const aiSearchBots = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "YandexBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: ["/"], disallow },
      ...aiSearchBots.map((userAgent) => ({ userAgent, allow: ["/"], disallow })),
      { userAgent: "*", allow: ["/"], disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
