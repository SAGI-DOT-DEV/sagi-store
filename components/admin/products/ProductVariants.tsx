'use client';
import Icon from '../Icon';
const variants = [
  { size: '500g', sku: 'SAGI-GR-500', price: 'CAD 2,500', stock: '142' },
  { size: '1KG', sku: 'SAGI-GR-1KG', price: 'CAD 4,800', stock: '89' },
];


export function ProductVariants(){return (<div className="bg-admin-surface-container-lowest p-8 border border-admin-outline-variant rounded-sm">
            <div className="flex justify-between items-center mb-6 border-b border-admin-outline-variant pb-4">
              <h2 className="font-serif text-xl">Variant Editor</h2>
              <button disabled title="Preview only — not connected to the backend" className="font-sans text-admin-label-sm text-admin-primary uppercase tracking-widest hover:text-admin-secondary flex items-center gap-1">
                <Icon name="add" style={{ fontSize: '16px' }} /> Add Variant
              </button>
            </div>
            <div className="space-y-4">
              {variants.map((v) => (
                <div key={v.sku} className="flex items-center gap-4 p-4 border border-admin-outline-variant bg-admin-surface hover:bg-admin-surface-variant transition-colors">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                    <div className="col-span-1">
                      <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-1">Size</label>
                      <span className="font-sans text-admin-body-md text-admin-on-surface">{v.size}</span>
                    </div>
                    <div className="col-span-1">
                      <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-1">SKU</label>
                      <input className="w-full bg-transparent border-b border-admin-outline-variant py-1 focus:outline-none focus:border-admin-primary font-sans text-sm rounded-none" type="text" defaultValue={v.sku} />
                    </div>
                    <div className="col-span-1">
                      <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-1">Price</label>
                      <input className="w-full bg-transparent border-b border-admin-outline-variant py-1 focus:outline-none focus:border-admin-primary font-sans text-sm rounded-none" type="text" defaultValue={v.price} />
                    </div>
                    <div className="col-span-1">
                      <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-1">Stock</label>
                      <input className="w-full bg-transparent border-b border-admin-outline-variant py-1 focus:outline-none focus:border-admin-primary font-sans text-sm rounded-none" type="number" defaultValue={v.stock} />
                    </div>
                  </div>
                  <button disabled title="Preview only — not connected to the backend" className="text-admin-outline hover:text-admin-error transition-colors p-2">
                    <Icon name="delete" style={{ fontSize: '20px' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>);}
