import { brandImage } from '../services/brand-image';
export const size = {width:64,height:64};
export const contentType = 'image/png';
export default function Icon() { return brandImage(size.width,size.height); }
