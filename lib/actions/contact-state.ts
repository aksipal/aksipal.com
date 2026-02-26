export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};
