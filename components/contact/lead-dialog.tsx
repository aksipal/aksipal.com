"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/lib/i18n";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type LeadDialogProps = {
  locale: Locale;
  buttonText: string;
  buttonVariant?: "default" | "secondary" | "ghost" | "outline";
  defaultSector?: string;
  defaultTemplate?: string;
};

export function LeadDialog({
  locale,
  buttonText,
  buttonVariant = "default",
  defaultSector = "Genel",
  defaultTemplate = "Belirsiz",
}: LeadDialogProps) {
  const [sector, setSector] = useState(defaultSector);
  const [template, setTemplate] = useState(defaultTemplate);
  const [city, setCity] = useState(locale === "tr" ? "İstanbul" : "Istanbul");
  const [budget, setBudget] = useState(locale === "tr" ? "₺20k-₺40k" : "20k-40k TRY");

  const copy = {
    tr: {
      title: "Hızlı Teklif Formu",
      description:
        "Kısa bilgileri doldurun, WhatsApp mesajı otomatik hazırlansın.",
      sector: "Sektör",
      template: "Şablon",
      city: "Şehir",
      budget: "Bütçe",
      whatsapp: "WhatsApp'ta Gönder",
      contact: "Detaylı Forma Git",
    },
    en: {
      title: "Quick Quote Form",
      description:
        "Fill in brief details and we will prepare an automatic WhatsApp message.",
      sector: "Sector",
      template: "Template",
      city: "City",
      budget: "Budget",
      whatsapp: "Send via WhatsApp",
      contact: "Open Full Form",
    },
  }[locale];

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppLink({
        sector,
        template,
        city,
        budget,
      }),
    [sector, template, city, budget],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div>
            <Label htmlFor="lead-sector">{copy.sector}</Label>
            <Input
              id="lead-sector"
              value={sector}
              onChange={(event) => setSector(event.target.value)}
              placeholder={copy.sector}
            />
          </div>
          <div>
            <Label htmlFor="lead-template">{copy.template}</Label>
            <Input
              id="lead-template"
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
              placeholder={copy.template}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="lead-city">{copy.city}</Label>
              <Input
                id="lead-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder={copy.city}
              />
            </div>
            <div>
              <Label htmlFor="lead-budget">{copy.budget}</Label>
              <Input
                id="lead-budget"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder={copy.budget}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button asChild variant="secondary">
            <a href={`/${locale}/iletisim`}>
              <Send className="size-4" />
              {copy.contact}
            </a>
          </Button>
          <Button asChild>
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              {copy.whatsapp}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
