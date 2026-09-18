export const platforms = ['Google Ads', 'Google Search', 'TikTok', 'Instagram', 'Facebook', 'Snapchat', 'YouTube', 'X / Twitter', 'Pinterest', 'LinkedIn', 'Direct', 'Other'] as const;
export function sourcePlatform(label: string): typeof platforms[number] {
  const [source = '', medium = ''] = label.toLowerCase().split(' / ').map(value => value.trim());
  const matches = (...names: string[]) => names.some(name => source === name || source.endsWith('.' + name));
  if (matches('google', 'google.com', 'googleads', 'google_ads') && /^(cpc|ppc|paid|paid_search|display|cpm|cpv)$/.test(medium)) return 'Google Ads';
  if (matches('google', 'google.com') && medium === 'organic') return 'Google Search';
  if (matches('tiktok', 'tiktok.com')) return 'TikTok';
  if (matches('instagram', 'instagram.com', 'ig')) return 'Instagram';
  if (matches('facebook', 'facebook.com', 'fb', 'fb.com')) return 'Facebook';
  if (matches('snapchat', 'snapchat.com', 'snap')) return 'Snapchat';
  if (matches('youtube', 'youtube.com', 'youtu.be')) return 'YouTube';
  if (matches('twitter', 'twitter.com', 'x', 'x.com', 't.co')) return 'X / Twitter';
  if (matches('pinterest', 'pinterest.com')) return 'Pinterest';
  if (matches('linkedin', 'linkedin.com')) return 'LinkedIn';
  if (source === '(direct)') return 'Direct';
  return 'Other';
}
export function groupTrafficSources(rows: {label: string; values: number[]}[]) {
  return platforms.map(name => {
    const sources = rows.filter(row => sourcePlatform(row.label) === name);
    return {name, sources, sessions: sources.reduce((total, row) => total + (row.values[0] ?? 0), 0)};
  });
}
