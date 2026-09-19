import { brandImage } from '../services/brand-image';
export const size = {width:1200,height:630};
export const contentType = 'image/png';
export const alt = 'SAGI Culinary Boutique — Nigerian heritage. Your Canadian pantry.';
export default function Image() { return brandImage(size.width,size.height,true); }
