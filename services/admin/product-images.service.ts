import {z} from 'zod';
import {apiRequest} from '../api-client';

export const MAX_PRODUCT_IMAGE_BYTES=10*1024*1024;
export function validateProductImage(file:Pick<File,'type'|'size'>){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Choose a JPG, PNG or WebP image.');
 if(file.size<=0||file.size>MAX_PRODUCT_IMAGE_BYTES)throw new Error('Images must be between 1 byte and 10 MB.');
}
const signatureSchema=z.object({cloudName:z.string().min(1),apiKey:z.string().min(1),timestamp:z.number(),signature:z.string().min(1),folder:z.string()});
export async function uploadProductImage(file:File,token:string):Promise<string>{
 validateProductImage(file);
 const signed=signatureSchema.parse(await apiRequest('/api/v1/uploads/products/cloudinary-signature',{method:'POST',body:'{}'},token));
 const body=new FormData();body.append('file',file);body.append('api_key',signed.apiKey);body.append('timestamp',String(signed.timestamp));body.append('signature',signed.signature);body.append('folder',signed.folder);
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),120000);
 try{
  const response=await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(signed.cloudName)}/image/upload`,{method:'POST',body,signal:controller.signal});
  if(!response.ok)throw new Error('Cloudinary could not upload this image. Please retry.');
  return z.object({secure_url:z.string().url().refine(value=>value.startsWith('https://'))}).parse(await response.json()).secure_url;
 }finally{clearTimeout(timeout);}
}
