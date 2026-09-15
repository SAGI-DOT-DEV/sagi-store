'use client';

export function ProductGeneral(){return (<div className="bg-admin-surface-container-lowest p-8 border border-admin-outline-variant rounded-sm">
            <h2 className="font-serif text-xl mb-6 border-b border-admin-outline-variant pb-4">General Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-sans text-admin-label-sm text-admin-on-surface mb-2 uppercase tracking-widest">Product Name</label>
                <input
                  className="w-full border-b border-admin-outline-variant bg-transparent py-2 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none"
                  placeholder="Enter product name"
                  type="text"
                  defaultValue="Artisanal Ijebu Garri"
                />
              </div>
              <div>
                <label className="block font-sans text-admin-label-sm text-admin-on-surface mb-2 uppercase tracking-widest">Description</label>
                <textarea
                  className="w-full border border-admin-outline-variant bg-transparent p-3 focus:outline-none focus:border-admin-primary font-sans text-admin-body-md text-admin-on-surface rounded-none"
                  placeholder="Describe the product..."
                  rows={4}
                  defaultValue="A premium, finely milled Ijebu Garri, traditionally roasted to perfection. Cultivated from select cassava roots, this artisanal staple offers a distinctively tart flavor profile and a crisp texture, ideal for sophisticated culinary applications or traditional enjoyment."
                />
              </div>
            </div>
          </div>);}
