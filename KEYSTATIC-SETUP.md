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

**Do NOT use the /keystatic/setup wizard on the live site.** The wizard's
final step tries to save the new app's secrets to disk, which a Netlify
serverless function cannot do, so it ends in HTTP 500 (this is what happened
on the first attempt). Create the GitHub App manually instead: it takes two
minutes and lets you pick the name.

**First, clean up:** if the failed wizard already created an app (it may be
named harryhayman), go to GitHub, Settings, Developer settings, GitHub Apps,
and delete it (or rename it to feedphilly-cms and reuse it in step 2).

1. Create the app at https://github.com/settings/apps/new (choose the
   Harry-Hayman account as the owner if prompted):
   - GitHub App name: **feedphilly-cms**
   - Homepage URL: https://feedphillycoalition.org
   - Callback URL: **https://feedphillycoalition.org/api/keystatic/github/oauth/callback**
   - Expire user authorization tokens: leave checked
   - Webhook: UNCHECK Active (no webhook needed)
   - Repository permissions: **Contents: Read and write**, **Metadata:
     Read-only**, **Pull requests: Read and write**
2. After creating: note the **Client ID**, then click **Generate a new
   client secret** and copy it.
3. Install the app: in the app's page, Install App, choose the Harry-Hayman
   account, select **Only select repositories: feedphilly**.
4. Generate the session secret locally (any machine):
   `node -e "console.log(require('crypto').randomBytes(40).toString('hex'))"`
5. In Netlify, Site configuration, Environment variables, add:

   | Variable | Value |
   | --- | --- |
   | `KEYSTATIC_GITHUB_CLIENT_ID` | Client ID from step 2 |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` | Client secret from step 2 |
   | `KEYSTATIC_SECRET` | The random hex from step 4 |
   | `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | The app slug: **feedphilly-cms** (from the app URL) |

6. Trigger a redeploy (public variables are baked in at build time), then
   open https://feedphillycoalition.org/keystatic and sign in with GitHub.

## Cautions

- NEVER edit "the impact of food insecurity on children" post in Keystatic:
  its 96 footnotes get rewritten on save. Edit that file directly.
- Image fields are plain text paths on purpose: existing posts store paths
  in two shapes and a picker would blank half of them.
