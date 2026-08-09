import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

// Keystatic's read/write API. Must run on demand.
// In GitHub storage mode it reads KEYSTATIC_GITHUB_CLIENT_ID,
// KEYSTATIC_GITHUB_CLIENT_SECRET and KEYSTATIC_SECRET from the environment.
// Those values are never committed: see KEYSTATIC-SETUP.md.
export const prerender = false;

export const ALL = makeHandler({ config });
