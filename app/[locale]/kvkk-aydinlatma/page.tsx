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
    pathname: "/kvkk-aydinlatma",
    title: locale === "tr" ? "KVKK Aydınlatma Metni" : "Personal Data Notice (KVKK)",
    description:
      locale === "tr"
        ? "6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma."
        : "Information about processing of personal data under Turkish law (KVKK).",
  });
}

export default async function KvkkPage({
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
        title="Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni"
        lastUpdated="Son güncelleme: 3 Nisan 2026"
        sections={[
          {
            heading: "Veri sorumlusu",
            body: `${siteConfig.legalName}\nAdres: ${siteConfig.address.addressLocality}, Türkiye\nE-posta: ${siteConfig.email}\nTelefon: ${siteConfig.phone}`,
          },
          {
            heading: "İşlenen kişisel veriler",
            body: [
              "Kimlik / iletişim: ad, e-posta, telefon.",
              "İşlem güvenliği: IP adresi, tarayıcı/oturum bilgisi (sunucu kayıtları).",
              "Talep içeriği: mesajınızda paylaştığınız bilgiler, sektör ve bütçe tercihleri.",
            ],
          },
          {
            heading: "İşleme amaçları",
            body: [
              "İletişim taleplerini yanıtlamak, teklif ve bilgilendirme sağlamak.",
              "Web sitesinin güvenli ve stabil çalışmasını sağlamak, kötüye kullanımı önlemek.",
              "Hukuki yükümlülükleri yerine getirmek.",
            ],
          },
          {
            heading: "Hukuki sebepler",
            body: "KVKK m. 5/2 (c) ve (ç) — veri sorumlusunun hukuki yükümlülüğü ve sözleşmenin kurulması/ifası; m. 5/2 (f) — meşru menfaat; analitik çerezlerde m. 5/1 — açık rıza.",
          },
          {
            heading: "Aktarım",
            body: `E-posta iletişimi ve form iletimi için hizmet sağlayıcılar (ör. Web3Forms) kullanılabilir. Yurt dışına aktarım söz konusu ise KVKK m. 9 kapsamındaki şartlara uyulur.`,
          },
          {
            heading: "Saklama süresi",
            body: "İlgili amaç için gerekli süre boyunca; hukuki süre ve zamanaşımı süreleri saklıdır.",
          },
          {
            heading: "Haklarınız",
            body: "KVKK m. 11 kapsamında; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme, aktarılan üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz.",
          },
          {
            heading: "Başvuru",
            body: `Taleplerinizi ${siteConfig.email} adresine iletebilirsiniz. Şikayetlerinizi Kişisel Verileri Koruma Kurulu’na iletme hakkınız saklıdır.`,
          },
        ]}
      />
    );
  }

  return (
    <LegalPageShell
      title="Personal Data Processing Notice (KVKK)"
      lastUpdated="Last updated: April 3, 2026"
      sections={[
        {
          heading: "Controller",
          body: `${siteConfig.legalName}\n${siteConfig.address.addressLocality}, Turkey\nEmail: ${siteConfig.email}\nPhone: ${siteConfig.phone}`,
        },
        {
          heading: "Categories of data",
          body: [
            "Identity/contact: name, email, phone.",
            "Security logs: IP, browser/session info where applicable.",
            "Message content and selections you provide (sector, budget).",
          ],
        },
        {
          heading: "Purposes",
          body: [
            "Responding to inquiries and providing quotes.",
            "Operating and securing the website.",
            "Complying with legal obligations.",
          ],
        },
        {
          heading: "Legal bases",
          body: "Processing is based on contract/legal obligation, legitimate interest, and—where applicable—consent (e.g., analytics cookies).",
        },
        {
          heading: "Transfers",
          body: "Providers such as Web3Forms may process submissions. International transfers follow applicable KVKK requirements.",
        },
        {
          heading: "Retention",
          body: "Data is retained as long as necessary for the purposes described, subject to legal retention periods.",
        },
        {
          heading: "Your rights & contact",
          body: `You may exercise your rights under Turkish law by contacting ${siteConfig.email}. You may also lodge a complaint with the Turkish DPA (KVKK).`,
        },
      ]}
    />
  );
}
