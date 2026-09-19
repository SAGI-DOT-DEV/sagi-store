import type { MetadataRoute } from 'next';
import { indexingAllowed, siteUrl } from '../services/seo';
export default function robots(): MetadataRoute.Robots {
  return {rules:indexingAllowed ? {userAgent:'*',allow:'/',disallow:['/api/','/admin/']} : {userAgent:'*',disallow:'/'},sitemap:`${siteUrl}/sitemap.xml`};
}
