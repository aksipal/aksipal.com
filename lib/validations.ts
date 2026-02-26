import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Ad en az 2 karakter olmalı."),
  email: z.string().trim().email("Geçerli bir e-posta giriniz."),
  phone: z.string().trim().min(10, "Telefon numarası çok kısa."),
  sector: z.string().trim().min(2, "Sektör bilgisi gerekli."),
  budget: z.string().trim().min(2, "Bütçe aralığı seçiniz."),
  message: z.string().trim().min(15, "Mesaj en az 15 karakter olmalı."),
  company: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
