// ============================================================
// CONFIGURAÇÕES DO EVENTO — edite aqui sem alterar estrutura
// ============================================================

export const CONFIG = {
  EVENT_NAME: "Evento WISE Madness",
  EVENT_DATE: "",
  EVENT_LOCATION: "",

  // URL pública permanente desta landing page (usada no QR Code)
  PUBLIC_URL: typeof window !== "undefined"
    ? `${window.location.origin}/evento`
    : "/evento",

  // Instagram
  INSTAGRAM_URL: "https://www.instagram.com/wisemadnesssocial/",

  // Vídeo — preencha VIDEO_IFRAME ou VIDEO_URL (iframe tem prioridade)
  VIDEO_URL: "",    // ex: https://www.youtube.com/watch?v=XXXXX
  VIDEO_IFRAME: "", // ex: <iframe src="..." ...></iframe>

  // PIX
  PIX_QR_IMAGE: "",    // caminho ou URL da imagem do QR Code PIX
  PIX_KEY: "",          // chave PIX (exibida abaixo do QR)
  PIX_COPY_PASTE: "",  // código PIX copia e cola

  // Links legais
  PRIVACY_URL: "",        // link para Política de Privacidade
  GIVEAWAY_RULES_URL: "", // link para Regulamento do Sorteio

  // Formulário: "native" (Supabase) ou "google_forms"
  FORM_MODE: "native" as "native" | "google_forms",
  GOOGLE_FORMS_URL: "",

  // Analytics (deixe vazio para desativar)
  GTM_ID: "",
  GA4_ID: "",
  META_PIXEL_ID: "",
} as const;
