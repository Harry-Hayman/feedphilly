# Keystatic CMS setup

The site's content editor is [Keystatic](https://keystatic.com). It replaced
Decap CMS (formerly Netlify CMS), which used Netlify Identity and Git Gateway.

- Editor URL: **https://feedphillycoalition.org/keystatic**
- Config: `keystatic.config.ts` at the repository root
- Content it manages: `src/content/blog/*.md` and `src/content/team/*.md`

No content file had to be rewritten for this migration. The Keystatic schema
mirrors the frontmatter the posts already use, and posts stay plain `.md`, so
every published URL is unchanged.

## Storage modes

`keystatic.config.ts` picks its mode from the environment:

| Where | Mode | Behaviour |
| --- | --- | --- |
| `npm run dev` on your machine | `local` | Saves write straight to the files on disk. No login, no setup. |
| Netlify (production) | `github` | Saves commit to `Harry-Hayman/feedphilly` as the logged in GitHub user. |

Local mode works right now with no configuration at all. Run `npm run dev` and
open http://localhost:4321/keystatic.

## Turning on GitHub mode in production

GitHub mode needs a GitHub App. Keystatic creates it for you through a wizard,
and the four values it produces are secrets, so they live in Netlify's
environment variables and are never committed.

1. Deploy the site to Netlify as normal (`git push origin main`).
2. Visit **https://feedphillycoalition.org/keystatic/setup**.
3. Follow the wizard. It asks you to name the GitHub App, then sends you to
   GitHub to create it and grant it access to the `Harry-Hayman/feedphilly`
   repository. Grant access to that repository only.
4. At the end the wizard shows four values. Copy them.
5. In Netlify, go to **Site configuration, Environment variables** and add all
   four:

   | Variable | Notes |
   | --- | --- |
   | `KEYSTATIC_GITHUB_CLIENT_ID` | From the wizard |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` | From the wizard. Secret. |
   | `KEYSTATIC_SECRET` | From the wizard. Secret. Signs the editor session. |
   | `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | From the wizard. Safe to expose: it is in the page HTML. |

6. Trigger a redeploy so the build picks up `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
   (public variables are baked in at build time; the other three are read at
   request time).
7. Go to https://feedphillycoalition.org/keystatic and sign in with GitHub.

Anyone with write access to the repository can then edit content. Saving in the
editor commits to `main`, and Netlify redeploys automatically.

Until step 5 is done, `/keystatic` in production shows the setup screen rather
than the editor. The public site is completely unaffected either way.

### Local testing of GitHub mode

Copy the same four values into a `.env` file at the repository root. `.env` is
already in `.gitignore`. Then run `npm run build && npx astro preview`, because
the config only switches to GitHub mode outside of `astro dev`.

## Known limits, and what to do about them

### 1. One post must not be edited in Keystatic

`src/content/blog/the impact of food insecurity on children.md` uses GitHub
flavoured footnotes (`[^1]`, `[^2]`, and matching definitions at the bottom).
Ninety six of them. The editor's rich text engine is Markdoc based and does not
recognise that syntax: it reads `[^1][^2]` as a reference link and, on save,
rewrites it into an inline link. That silently mangles the article.

**Edit that post directly in the repository, not in Keystatic.** Every other
post is free of footnotes and round trips cleanly. The warning is repeated in
the editor itself, under the Content field.

If that post is ever rewritten without footnote syntax, this limitation
disappears on its own.

### 2. Image fields are text, not a picker

`authorImage`, `cardImage` and the team `image` are plain text fields holding a
repository path.

The reason: existing posts store these in two shapes, `src/images/...` and
`/src/images/...`. Astro resolves both. A Keystatic file picker only matches one
shape, so on the posts using the other shape it would show an empty **required**
field and refuse to save. A text field preserves whatever is already there,
exactly.

To add a new image, commit the file under `src/images/blog/` and paste its path.

To upgrade to a real picker later: normalise every `authorImage` / `cardImage` /
`image` value to have no leading slash, then swap those three fields to

```ts
fields.pathReference({ label: '...', pattern: 'src/images/**', validation: { isRequired: true } })
```

### 3. Saving normalises frontmatter formatting

Saving a post through Keystatic reformats its frontmatter: keys are reordered to
match the schema, long `description` values wrap as a YAML folded scalar, and
`draft: false` is written explicitly. The values are identical, only the layout
changes. Saving also tightens markdown lists by dropping the blank lines between
list items. Neither affects what readers see.

### 4. Slugs in Keystatic are file names

Two posts have file names with spaces and capitals
(`Food Insecurity Crisis in Philadelphia.md`, `the impact of food insecurity on
children.md`). Keystatic shows the raw file name as the slug, while the site
publishes them lowercased and hyphenated. That mismatch is cosmetic.

Do not rename these files. The published URL is derived from the file name, so a
rename breaks inbound links and search rankings.

### 5. One post is intentionally missing from your checkout

`src/content/blog/Philadelphia Food Insecurity Solutions: Your Guide to Free
Nutritional Resources.md` contains a colon, which Windows cannot write to disk.
It is committed and it is live, but this clone excludes it via
`skip-worktree`, so local builds skip it and Keystatic's local mode does not
list it. In GitHub mode Keystatic reads from GitHub and **will** show it.

Never run `git sparse-checkout` commands in this clone, and never let anything
stage a deletion of that file.

## Rolling back

The old Decap setup was `public/admin/`, `src/pages/admin.html` and the Netlify
Identity widget in `src/layouts/MainLayout.astro`. All of it was removed in the
Keystatic migration commit; `git revert` that commit to restore it. Netlify
Identity and Git Gateway would also have to be re-enabled in the Netlify UI.
