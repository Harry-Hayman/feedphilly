/// <reference types="astro/client" />

declare module 'astro:content' {
  interface Render {
    '.md': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module 'astro:content' {
  export interface CollectionEntry<C> {
    id: string;
    slug: string;
    body: string;
    collection: C;
    data: any;
    render(): Render['.md'];
  }

  export function getCollection<C = any>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => boolean
  ): Promise<CollectionEntry<C>[]>;

  export function getEntry<C = any>(
    collection: C,
    slug: string
  ): Promise<CollectionEntry<C>>;
}
