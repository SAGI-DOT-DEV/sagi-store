import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export async function brandImage(width: number, height: number, social = false) {
  const logo = await readFile(join(process.cwd(), 'public', social ? 'Asset 1 (1).png' : 'sagi elephant black (1).png'));
  if (!social) {
    // Frame the elephant rather than the empty margins in the original PNG.
    const mark = { x: 1328, y: 44, width: 1328, height: 1267 };
    const scale = Math.min(width * 0.88 / mark.width, height * 0.88 / mark.height);
    return new ImageResponse(<div style={{display:'flex',position:'relative',width:'100%',height:'100%',overflow:'hidden',background:'#FFFFFF'}}>
      <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="SAGI" width={3577 * scale} height={2167 * scale} style={{position:'absolute',left:(width - mark.width * scale) / 2 - mark.x * scale,top:(height - mark.height * scale) / 2 - mark.y * scale}} />
    </div>, {width,height});
  }
  const logoWidth = social ? 650 : width * 0.88;
  const logoHeight = logoWidth * (social ? 236 / 860 : 2167 / 3577);
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#FFFFFF',alignItems:'center',justifyContent:'center',flexDirection:'column',border: social ? '12px solid #D4D4D4' : 'none'}}>
    <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="SAGI" width={logoWidth} height={logoHeight} />
    {social && <><div style={{display:'flex',marginTop:32,fontSize:24,letterSpacing:8,color:'#737373'}}>CULINARY BOUTIQUE</div><div style={{display:'flex',marginTop:48,fontSize:32,color:'#000000'}}>Nigerian heritage. Your Canadian pantry.</div></>}
  </div>, {width,height});
}
