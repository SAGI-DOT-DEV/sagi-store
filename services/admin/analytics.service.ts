import {z} from 'zod';
import {apiRequest} from '../api-client';
const report=z.object({rows:z.array(z.object({label:z.string(),values:z.array(z.number())})),thresholded:z.boolean()});
const schema=z.discriminatedUnion('configured',[z.object({configured:z.literal(false)}),z.object({configured:z.literal(true),days:z.number(),fetchedAt:z.string(),reports:z.object({overview:report,daily:report,channels:report,pages:report,countries:report,devices:report,events:report,products:report})})]);
export type AnalyticsReport=z.infer<typeof report>;
export type AnalyticsData=z.infer<typeof schema>;
export async function getAnalytics(days:string,token:string){return schema.parse(await apiRequest('/api/v1/admin/analytics?'+new URLSearchParams({days}),{cache:'no-store'},token));}
