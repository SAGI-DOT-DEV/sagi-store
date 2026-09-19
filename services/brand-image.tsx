import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export async function brandImage(width: number, height: number, social = false) {
  const logo = await readFile(join(process.cwd(), 'public', 'Asset 1 (1).png'));
  const logoWidth = social ? 650 : width * 0.88;
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#FAF9F5',alignItems:'center',justifyContent:'center',flexDirection:'column',border: social ? '12px solid #D9CFBD' : '2px solid #D9CFBD'}}>
    <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="SAGI" width={logoWidth} height={logoWidth * 236 / 860} />
    {social && <><div style={{display:'flex',marginTop:32,fontSize:24,letterSpacing:8,color:'#8C7B5A'}}>CULINARY BOUTIQUE</div><div style={{display:'flex',marginTop:48,fontSize:32,color:'#1C1A17'}}>Nigerian heritage. Your Canadian pantry.</div></>}
  </div>, {width,height});
}
