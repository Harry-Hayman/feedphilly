import { visit } from 'unist-util-visit';

/**
 * Markdown body images.
 *
 * Images written as `![alt](url)` inside a post get no loading hints at all,
 * and any that point at a remote host cannot be optimised or measured by
 * Astro. This adds the attributes that are safe to add without knowing the
 * file's dimensions:
 *
 * - loading="lazy" and decoding="async", because body images are below the
 *   fold by definition (the post's header image is rendered separately)
 * - referrerpolicy on remote images
 * - a max-width so a large remote image cannot overflow the column
 */
export default function rehypeMarkdownImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;

      const props = node.properties ?? (node.properties = {});

      if (!props.loading) props.loading = 'lazy';
      if (!props.decoding) props.decoding = 'async';

      const src = typeof props.src === 'string' ? props.src : '';
      if (/^https?:\/\//.test(src)) {
        props.referrerpolicy = 'no-referrer';
        // Remote images have no intrinsic size available at build time, so
        // reserve a sensible box rather than letting them jump the layout.
        props.style = [props.style, 'max-width:100%;height:auto']
          .filter(Boolean)
          .join(';');
      }
    });
  };
}
