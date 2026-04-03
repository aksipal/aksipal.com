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
    pathname: "/gizlilik-politikasi",
    title: locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy",
    description:
      locale === "tr"
        ? `${siteConfig.name} kişisel verilerin işlenmesi ve gizlilik ilkeleri.`
        : `How ${siteConfig.name} processes personal data and respects your privacy.`,
  });
}

export default async function PrivacyPolicyPage({
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
        title="Gizlilik Politikası"
        lastUpdated="Son güncelleme: 3 Nisan 2026"
        sections={[
          {
            heading: "1. Veri sorumlusu",
            body: `Ticari unvan: ${siteConfig.legalName}\nWeb sitesi: ${siteConfig.url}\nE-posta: ${siteConfig.email}\nTelefon: ${siteConfig.phone}`,
          },
          {
            heading: "2. Hangi verileri işliyoruz?",
            body: [
              "İletişim formu: ad-soyad, e-posta, telefon, mesaj ve seçtiğiniz sektör/bütçe bilgisi.",
              "Teknik loglar: barındırma sağlayıcısı / altyapı tarafından üretilen sunucu kayıtları (IP, tarih-saat, tarayıcı bilgisi) — güvenlik ve sorun giderme amaçlı, makul süreyle.",
              "Çerez ve benzeri: Çerez Politikamızda açıklandığı gibi; analitik yalnızca onayınızla.",
            ],
          },
          {
            heading: "3. Amaçlar ve hukuki sebepler",
            body: [
              "Talebinize yanıt vermek, teklif hazırlamak — sözleşmenin kurulması veya ifası / meşru menfaat (KVKK m. 5).",
              "Siteyi güvenli ve çalışır tutmak — meşru menfaat ve hukuki yükümlülük.",
              "Ölçümleme (onaylı analitik) — açık rıza.",
            ],
          },
          {
            heading: "4. Saklama süresi",
            body: "İletişim kayıtları, talebin niteliğine göre makul süreyle; yasal zorunluluk varsa ilgili mevzuatta öngörülen süreyle saklanır. Arşiv / yedeklerde daha uzun süre bulunması teknik olarak mümkün olabilir; bu süre sonunda silinir veya anonim hale getirilir.",
          },
          {
            heading: "5. Aktarım",
            body: "Form gönderimi e-posta iletişimi için Web3Forms veya benzeri bir sağlayıcı üzerinden işlenebilir. Analitik için Google Analytics kullanılıyorsa veri işleme Google tarafındadır. Hizmet sağlayıcılarımızla veri işleme sözleşmesi veya KVKK’ya uygun düzenlemeler uygulanır.",
          },
          {
            heading: "6. Haklarınız",
            body: "KVKK kapsamında; erişim, düzeltme, silme, itiraz, veri taşınabilirliği (koşullarında) ve şikayet hakkı (KVKK Kurulu) bulunmaktadır. Taleplerinizi e-posta ile iletebilirsiniz.",
          },
          {
            heading: "7. Güvenlik",
            body: "Uygun teknik ve idari tedbirlerle verilerinizin korunması hedeflenir; internet üzerinden iletimin %100 riskten arınmış olduğu garanti edilemez.",
          },
        ]}
      />
    );
  }

  return (
    <LegalPageShell
      title="Privacy Policy"
      lastUpdated="Last updated: April 3, 2026"
      sections={[
        {
          heading: "1. Data controller",
          body: `${siteConfig.legalName}\nWebsite: ${siteConfig.url}\nEmail: ${siteConfig.email}\nPhone: ${siteConfig.phone}`,
        },
        {
          heading: "2. Data we process",
          body: [
            "Contact form: name, email, phone, message, sector/budget selections.",
            "Technical logs from hosting (IP, timestamp, browser info) for security and operations.",
            "Cookies as described in our Cookie Policy.",
          ],
        },
        {
          heading: "3. Purposes and legal bases",
          body: [
            "Responding to inquiries and preparing quotes — contract / legitimate interest.",
            "Operating and securing the site — legitimate interest / legal obligation.",
            "Analytics — consent when applicable.",
          ],
        },
        {
          heading: "4. Retention",
          body: "Contact records are kept for a reasonable period depending on the request; legal retention may apply. Backups may persist briefly.",
        },
        {
          heading: "5. Transfers",
          body: "Form delivery may use providers such as Web3Forms. Analytics may use Google Analytics when enabled.",
        },
        {
          heading: "6. Your rights",
          body: "You may request access, correction, deletion, restriction, objection, and portability where applicable, and lodge a complaint with a supervisory authority.",
        },
        {
          heading: "7. Security",
          body: "We apply appropriate technical and organizational measures; no online transmission is completely risk-free.",
        },
      ]}
    />
  );
}
