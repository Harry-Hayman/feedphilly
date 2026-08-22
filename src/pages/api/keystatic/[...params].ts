import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

// Keystatic's read/write API. Must run on demand.
// It does the real work only in local storage mode, which is what `npm run dev`
// uses: saves in the editor become writes to the files on disk. In production
// the site runs cloud storage, where the editor talks to Keystatic Cloud
// directly and this route deliberately answers 404. Keep it: dev needs it.
export const prerender = false;

export const ALL = makeHandler({ config });
