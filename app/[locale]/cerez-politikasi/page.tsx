import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { siteConfig } from "@/lib/constants";
import { isLocale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return createPageMetadata({
    locale,
    pathname: "/cerez-politikasi",
    title: locale === "tr" ? "Çerez Politikası" : "Cookie Policy",
    description:
      locale === "tr"
        ? `${siteConfig.name} çerez kullanımı, çerez türleri ve yönetim seçenekleri.`
        : `Cookie usage, categories, and your choices on ${siteConfig.name}.`,
  });
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  if (locale === "tr") {
    return (
      <LegalPageShell
        title="Çerez Politikası"
        lastUpdated="Son güncelleme: 3 Nisan 2026"
        sections={[
          {
            heading: "1. Çerez nedir?",
            body: "Çerezler, ziyaret ettiğiniz web sitesinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Siteyi çalıştırmak, tercihlerinizi hatırlamak ve (onay verirseniz) kullanım istatistikleri üretmek için kullanılabilir.",
          },
          {
            heading: "2. Hangi çerezleri kullanıyoruz?",
            body: [
              "Zorunlu / teknik: Oturum ve güvenlik ile ilgili temel işlevler; site düzgün çalışsın diye gereklidir. Hukuki sebep: KVKK m. 5/2 (f) meşru menfaat veya sözleşmenin ifası.",
              "Tercih çerezi: Çerez bildiriminde yaptığınız seçim (localStorage üzerinde saklanır) — tekrar sormamak için.",
              "Analitik (isteğe bağlı): Yalnızca çerez banner’ında analitiği kabul etmeniz halinde yüklenir. Google Analytics kullanılıyorsa IP anonimleştirme önerilir. Hukuki sebep: açık rıza (KVKK m. 5/1).",
            ],
          },
          {
            heading: "3. Üçüncü taraflar",
            body: `İsteğe bağlı analitik için Google Analytics (Google LLC) kullanılıyorsa, Google’ın gizlilik uygulamaları kendi politikalarına tabidir. İletişim formu gönderimleri Web3Forms gibi bir hizmet üzerinden işlenebilir; bu işlem sunucu tarafında yapılır ve çerez politikasındaki analitik onayınızdan bağımsızdır.`,
          },
          {
            heading: "4. Süre",
            body: [
              "Tercih kaydı (localStorage): Tarayıcı veya veriyi silene kadar.",
              "Google Analytics çerezleri: Google’ın belirlediği süreler (genelde en fazla 13 ay).",
            ],
          },
          {
            heading: "5. Çerezleri nasıl yönetirsiniz?",
            body: `Sayfa altındaki bildirimden «Tercihleri yönet» ile analitik seçimini değiştirebilir veya tarayıcı ayarlarından çerezleri silebilirsiniz. Zorunlu çerezleri kapatmak sitenin bazı bölümlerinin çalışmamasına yol açabilir.\n\nGoogle Analytics için: https://tools.google.com/dlpage/gaoptout`,
          },
          {
            heading: "6. İletişim",
            body: `Çerezlerle ilgili sorularınız için: ${siteConfig.email}`,
          },
        ]}
      />
    );
  }

  return (
    <LegalPageShell
      title="Cookie Policy"
      lastUpdated="Last updated: April 3, 2026"
      sections={[
        {
          heading: "1. What are cookies?",
          body: "Cookies are small text files stored by your browser. They may be used to run the site, remember your preferences, and—if you consent—measure usage.",
        },
        {
          heading: "2. Cookies we use",
          body: [
            "Essential / technical: core functionality and security.",
            "Preference: your cookie-banner choice (stored in localStorage).",
            "Analytics (optional): loaded only if you accept analytics in the banner. If Google Analytics is enabled, IP anonymization is recommended.",
          ],
        },
        {
          heading: "3. Third parties",
          body: "Optional analytics may use Google Analytics. Contact form delivery may use a provider such as Web3Forms (server-side).",
        },
        {
          heading: "4. Retention",
          body: [
            "Preference storage: until cleared in the browser.",
            "Google Analytics cookies: per Google’s policies (often up to ~13 months).",
          ],
        },
        {
          heading: "5. Managing cookies",
          body: `Use “Manage preferences” in the banner or your browser settings. Rejecting essential cookies may break parts of the site.\n\nGoogle Analytics opt-out: https://tools.google.com/dlpage/gaoptout`,
        },
        {
          heading: "6. Contact",
          body: `Questions: ${siteConfig.email}`,
        },
      ]}
    />
  );
}
