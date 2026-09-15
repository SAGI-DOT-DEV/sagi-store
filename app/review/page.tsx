import {z} from 'zod';
import {StorefrontShell} from '../../components/StorefrontShell';
import {ReviewView} from '../../views/ReviewView';
export const metadata={title:'Review your experience | SAGI',robots:{index:false,follow:false}};
export default async function ReviewPage({searchParams}:{searchParams:Promise<{orderId?:string|string[]}>}){
 const parsed=z.string().cuid().safeParse((await searchParams).orderId);
 return <StorefrontShell><ReviewView orderId={parsed.success?parsed.data:null}/></StorefrontShell>;
}
