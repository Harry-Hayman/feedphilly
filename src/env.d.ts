/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GEMINI_API_KEY: string;
  // Keystatic needs no variables: it runs on Keystatic Cloud, which owns the
  // GitHub App and the sign in. See KEYSTATIC-SETUP.md.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// NOTE: this file used to redeclare `astro:content` by hand, which shadowed the
// types Astro generates from src/content.config.ts and typed every entry's
// `data` as `any`. Those declarations were removed so the real, schema derived
// types apply.
