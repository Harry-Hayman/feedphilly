/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GEMINI_API_KEY: string;
  /** Public slug of the GitHub App backing Keystatic. See KEYSTATIC-SETUP.md. */
  readonly PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: string;
  readonly KEYSTATIC_GITHUB_CLIENT_ID: string;
  readonly KEYSTATIC_GITHUB_CLIENT_SECRET: string;
  readonly KEYSTATIC_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// NOTE: this file used to redeclare `astro:content` by hand, which shadowed the
// types Astro generates from src/content.config.ts and typed every entry's
// `data` as `any`. Those declarations were removed so the real, schema derived
// types apply.
