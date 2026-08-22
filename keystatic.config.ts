import { config, collection, fields } from '@keystatic/core';

/**
 * Keystatic CMS configuration for Feed Philly Coalition.
 *
 * The schema below mirrors the EXISTING frontmatter of the files in
 * src/content/blog and src/content/team exactly, so no content file has to be
 * rewritten for Keystatic to read it, and the site keeps rendering unchanged.
 *
 * Storage:
 *   local dev  -> `local` mode, edits write straight to disk at /keystatic
 *   production -> `cloud` mode, hosted by Keystatic Cloud
 *
 * Cloud mode replaced the self hosted `github` mode. Keystatic Cloud owns the
 * GitHub App and the sign in, so the site no longer needs a GitHub App of its
 * own and no longer reads any KEYSTATIC_* environment variable. The project
 * name below is the only thing tying the site to the account, and unlike the
 * old client secret it is safe to commit: see KEYSTATIC-SETUP.md.
 *
 * Saves still land as commits in Harry-Hayman/feedphilly. That repository is
 * connected on the Keystatic Cloud project, not named here.
 */
const storage = import.meta.env.DEV
  ? ({ kind: 'local' } as const)
  : ({ kind: 'cloud' } as const);

export default config({
  storage,
  cloud: { project: 'feed-philly/feedphilly' },
  ui: {
    brand: { name: 'Feed Philly Coalition' },
    navigation: {
      Content: ['blog', 'team'],
    },
  },
  collections: {
    blog: collection({
      label: 'Blog posts',
      path: 'src/content/blog/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Slug (URL)',
            description:
              'This becomes the file name and the page URL. Changing it on an existing post changes its URL and breaks inbound links, so leave published slugs alone.',
          },
        }),
        pubDate: fields.datetime({
          label: 'Publication date',
          defaultValue: { kind: 'now' },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description:
            'Marks the post as unfinished. Note: the site currently renders every post in the folder, drafts included.',
          defaultValue: false,
        }),
        author: fields.text({
          label: 'Author',
          description:
            'Display name, exactly as it should appear on the post (for example "Harry Hayman").',
          validation: { isRequired: true },
        }),
        // NOTE: authorImage and cardImage are plain text, not a file picker.
        // Existing posts store these paths in two shapes ("src/images/..." and
        // "/src/images/..."), both of which Astro resolves. A picker only
        // matches one shape, so it would show an empty required field on the
        // posts that use the other and block saving. Text round-trips every
        // existing value byte for byte. See KEYSTATIC-SETUP.md to switch to a
        // picker later.
        authorImage: fields.text({
          label: 'Author image',
          description:
            'Repository path to the image, for example src/images/blog/members/harryhayman_founder.jpg. To add a new one, commit the file under src/images/blog/ first.',
          validation: { isRequired: true },
        }),
        authorImageAlt: fields.text({
          label: 'Author image alt text',
          validation: { isRequired: false },
        }),
        cardImage: fields.text({
          label: 'Card image',
          description:
            'Repository path to the header and card image, for example src/images/blog/feed_philly.png. To add a new one, commit the file under src/images/blog/ first.',
          validation: { isRequired: true },
        }),
        cardImageAlt: fields.text({
          label: 'Card image alt text',
          description: 'Describe what is in the image for screen readers and search engines.',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          description:
            'Used as the meta description and the card summary. Aim for 140 to 160 characters.',
          multiline: true,
          validation: { isRequired: true },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        readTime: fields.integer({
          label: 'Read time (minutes)',
          description: 'Leave blank to calculate it automatically from the post length.',
          validation: { isRequired: false },
        }),
        // Legacy key kept in some posts. `ignored` round-trips whatever is
        // already stored without showing an editor field, so saving a post
        // never silently drops it.
        contents: fields.ignored(),
        content: fields.markdoc({
          label: 'Content',
          description:
            'Heads up: "The Impact of Food Insecurity on Children\'s Health and Development" uses GitHub style footnotes ([^1]) that this editor does not understand. Edit that one post in the repository, not here. Every other post is safe.',
          // Keeps the file as plain .md so Astro's existing markdown pipeline
          // and every current URL stay exactly as they are.
          extension: 'md',
        }),
      },
    }),
    team: collection({
      label: 'Team members',
      path: 'src/content/team/*',
      slugField: 'name',
      format: { contentField: 'content' },
      columns: ['name', 'role'],
      schema: {
        name: fields.slug({
          name: { label: 'Name', validation: { isRequired: true } },
        }),
        role: fields.text({
          label: 'Role',
          validation: { isRequired: true },
        }),
        image: fields.text({
          label: 'Photo',
          description:
            'Repository path to the photo, for example src/images/blog/members/harryhayman_founder.jpg.',
          validation: { isRequired: true },
        }),
        authorImageAlt: fields.text({
          label: 'Photo alt text',
          validation: { isRequired: false },
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
          validation: { isRequired: true },
        }),
        website: fields.url({
          label: 'Website',
          description:
            "Optional. The member's own site. Shown as a link on their card on the About page. Leave empty and no link appears.",
          validation: { isRequired: false },
        }),
        order: fields.integer({
          label: 'Display order',
          description: 'Lower numbers appear first on the About page.',
          validation: { isRequired: false },
        }),
        content: fields.markdoc({
          label: 'Extra notes',
          extension: 'md',
        }),
      },
    }),
  },
});
