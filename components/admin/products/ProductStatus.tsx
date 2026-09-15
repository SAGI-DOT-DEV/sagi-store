'use client';
import {useState} from 'react';

export function ProductStatus(){const [active,setActive]=useState(true);return (<div className="bg-admin-surface-container-lowest p-6 border border-admin-outline-variant rounded-sm">
            <h3 className="font-serif text-lg mb-4 border-b border-admin-outline-variant pb-2">Status</h3>
            <div className="flex items-center justify-between">
              <span className="font-sans text-admin-body-md text-admin-on-surface">Active on Storefront</span>
              <button
                role="switch" aria-label="Active on storefront (preview)" aria-checked={active} onClick={() => setActive(!active)}
                className={`relative inline-block w-10 h-5 rounded-full transition-colors duration-200 ${active ? 'bg-admin-primary' : 'bg-admin-surface-variant'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white border-2 transition-transform duration-200 ${active ? 'translate-x-5 border-admin-primary' : 'border-admin-surface-variant'}`}
                ></span>
              </button>
            </div>
          </div>);}
