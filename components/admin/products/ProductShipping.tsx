'use client';

export function ProductShipping(){return (<div className="bg-admin-surface-container-lowest p-6 border border-admin-outline-variant rounded-sm">
            <h3 className="font-serif text-lg mb-4 border-b border-admin-outline-variant pb-2">Shipping (Base)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-2">Weight (kg)</label>
                <input className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none" step="0.1" type="number" defaultValue="0.5" />
              </div>
              <div>
                <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-2">Length (cm)</label>
                <input className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none" type="number" defaultValue="15" />
              </div>
              <div>
                <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-2">Width (cm)</label>
                <input className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none" type="number" defaultValue="10" />
              </div>
              <div>
                <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-2">Height (cm)</label>
                <input className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none" type="number" defaultValue="5" />
              </div>
            </div>
          </div>);}
