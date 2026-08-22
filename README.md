# Feed Philly Coalition

The website for [Feed Philly Coalition](https://feedphillycoalition.org), a
Philadelphia coalition working on food insecurity. Built with Astro, styled with
Tailwind, deployed on Netlify from `main`.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:4321
```

Other scripts:

```bash
npm run build    # type check, then production build
npm run preview  # serve the production build
```

## Editing content

Content is edited in **Keystatic**, at `/keystatic`.

- Locally: `npm run dev`, then open http://localhost:4321/keystatic. Saves write
  straight to the files in `src/content/`. No login needed.
- In production: https://feedphillycoalition.org/keystatic, signed in through
  Keystatic Cloud. Saves commit to this repository and Netlify redeploys.

Production runs on **Keystatic Cloud** (team `feed-philly`, project
`feedphilly`), so the site holds no CMS secrets and needs no environment
variables. Read **KEYSTATIC-SETUP.md** before touching the CMS: it covers who
can edit, what to check when sign in breaks, and three content quirks worth
knowing about, including one post that must not be edited through the editor.

## How the project is laid out

```
keystatic.config.ts       CMS schema, mirrors the frontmatter already in use
src/content.config.ts     Astro content collections (blog, team)
src/content/blog/*.md     Articles. The file name IS the URL: never rename one.
src/content/team/*.md     Team members shown on /about
src/pages/                Routes
src/components/           UI components
src/images/               Images, optimised at build time by Astro
docs/legacy-copy-notes/   Old draft copy, not published anywhere
netlify.toml              Redirects, caching and security headers
```

## Two things that will bite you

**Do not rename files in `src/content/blog/`.** Each post's URL is derived from
its file name. Renaming one silently breaks every inbound link and the page's
search ranking.

**Do not run `git sparse-checkout` in this clone.** One post's file name
contains a colon, which Windows cannot write to disk, so that file is excluded
locally via `skip-worktree`. It is committed and live. Sparse checkout commands
can stage it as deleted and remove it from the site. Check
`git status --porcelain` for unexpected deletions before every commit.
