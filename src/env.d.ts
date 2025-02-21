/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GEMINI_API_KEY: string;
  readonly PUBLIC_TIDIO_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  tidioChatApi?: {
    show: () => void;
    open: () => void;
    hide: () => void;
  };
}
