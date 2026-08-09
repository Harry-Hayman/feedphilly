import { makePage } from '@keystatic/astro/ui';
import config from '../../../keystatic.config';

/**
 * The Keystatic admin UI, bound to this project's config.
 *
 * It lives in its own module (rather than inline in the .astro route) because
 * Astro's `client:only` directive needs a resolvable component import path.
 */
export const Keystatic = makePage(config);
