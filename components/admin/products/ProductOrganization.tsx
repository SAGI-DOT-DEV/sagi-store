'use client';

export function ProductOrganization(){return (<div className="bg-admin-surface-container-lowest p-6 border border-admin-outline-variant rounded-sm">
            <h3 className="font-serif text-lg mb-4 border-b border-admin-outline-variant pb-2">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-2">Category</label>
                <select className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none appearance-none">
                  <option>Grains & Staples</option>
                  <option>Spices</option>
                  <option>Oils</option>
                </select>
              </div>
              <div>
                <label className="block font-sans text-[10px] text-admin-on-surface-variant uppercase tracking-widest mb-2">Highlights (optional)</label>
                <input className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none" type="text" placeholder="e.g. Stone-ground, Unpolished" />
              </div>
            </div>
          </div>);}
