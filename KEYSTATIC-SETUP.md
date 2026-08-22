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
| Netlify (production) | `cloud` | Saves commit to `Harry-Hayman/feedphilly` through Keystatic Cloud, as the logged in user. |

Local mode works right now with no configuration at all. Run `npm run dev` and
open http://localhost:4321/keystatic.

## Production runs on Keystatic Cloud

The site used to run a **self hosted GitHub App**: four secrets in Netlify, an
app to create and install by hand, and a setup wizard that could not work on a
serverless host. That is gone. Production now uses **Keystatic Cloud**, which
owns the GitHub App and the sign in.

What that means in practice:

- **No environment variables.** `KEYSTATIC_GITHUB_CLIENT_ID`,
  `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and
  `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` are no longer read by anything. Delete them
  from Netlify, Site configuration, Environment variables.
- **No GitHub App of ours.** If `feedphilly-cms` (or the wizard's leftover app)
  still exists under GitHub, Settings, Developer settings, GitHub Apps, delete
  it. Keystatic Cloud installs its own app on the repository.
- **Never use `/keystatic/setup`.** That wizard belongs to the old self hosted
  flow and fails on Netlify. There is nothing to set up on the site any more.
- The only link between site and account is one committed line in
  `keystatic.config.ts`:

  ```ts
  cloud: { project: 'feed-philly/feedphilly' },
  ```

  A project name is not a secret, so it lives in the repository.

### The Keystatic Cloud side

Managed at https://keystatic.cloud, team **feed-philly**, project
**feedphilly**. Two settings there have to match this site or sign in fails:

| Setting | Value |
| --- | --- |
| Project URL (primary) | `https://feedphillycoalition.org` |
| GitHub organisation | `Harry-Hayman` |
| Repository | `feedphilly` |

Keystatic Cloud only lets people sign in from a URL listed on the project, so
the primary URL must be the live domain, exactly, with no trailing path. Add a
second URL if the editor is ever needed on a Netlify deploy preview or on
`http://localhost:4321` (local dev does not need it: it uses local mode).

### Who can edit

Editors are people, added on the **Users** page of the Keystatic Cloud team.
There is no shared login and no repository access to hand out: adding somebody
there is what lets them save, and removing them there is what stops them.

### If sign in breaks

1. The URL you opened the editor on is not listed on the project. Most likely
   cause, and the fix is to add it.
2. The person is not on the team's Users page.
3. Keystatic Cloud lost its GitHub installation on `Harry-Hayman/feedphilly`,
   which shows up as saves failing rather than sign in failing. Reconnect the
   repository on the project page.

## Cautions

- NEVER edit "the impact of food insecurity on children" post in Keystatic:
  its 96 footnotes get rewritten on save. Edit that file directly.
- Image fields are plain text paths on purpose: existing posts store paths
  in two shapes and a picker would blank half of them.
