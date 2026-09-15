export const homePage = {
  name: 'homePage', title: 'Home Page', type: 'document', fields: [
    { name: 'announcement', title: 'Announcement', type: 'string' },
    { name: 'hero', title: 'Hero', type: 'object', fields: [{ name: 'eyebrow', type: 'string' }, { name: 'title', type: 'string' }, { name: 'emphasis', type: 'string' }, { name: 'description', type: 'text' }, { name: 'image', type: 'url' }, { name: 'imageAlt', type: 'string' }, { name: 'primaryCta', type: 'string' }, { name: 'secondaryCta', type: 'string' }] },
    { name: 'metrics', title: 'Metrics', type: 'array', of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }] },
    { name: 'philosophy', title: 'Philosophy', type: 'object', fields: [{ name: 'eyebrow', type: 'string' }, { name: 'quote', type: 'text' }, { name: 'attribution', type: 'string' }] },
    { name: 'staples', title: 'Staples section', type: 'object', fields: [{ name: 'eyebrow', type: 'string' }, { name: 'title', type: 'string' }, { name: 'catalogCta', type: 'string' }] },
    { name: 'journals', title: 'Journals section', type: 'object', fields: [{ name: 'eyebrow', type: 'string' }, { name: 'title', type: 'string' }, { name: 'description', type: 'text' }, { name: 'cta', type: 'string' }] },
    { name: 'provenance', title: 'Provenance section', type: 'object', fields: [{ name: 'eyebrow', type: 'string' }, { name: 'title', type: 'string' }, { name: 'description', type: 'text' }, { name: 'cta', type: 'string' }] },
  ],
};
