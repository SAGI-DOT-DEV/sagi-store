'use client';
import { AdminImage } from '../AdminImage';
import Icon from '../Icon';

export function ProductMedia(){return (<div className="bg-admin-surface-container-lowest p-8 border border-admin-outline-variant rounded-sm">
            <h2 className="font-serif text-xl mb-6 border-b border-admin-outline-variant pb-4">Product Imagery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 relative group cursor-pointer border border-admin-outline-variant">
                <AdminImage
                  className="w-full h-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiH-AxW83Jo4HOXe_q7ksf350XNnMBxaUp7EvOvpEjUeDakrQX-B4B854xQhHqQ3x6aoIMKVfBZ6oRnxMbkVYVUo4n_4EA3EKRSBljrCVEuErcHPeV8hzw0drFa0xNxJHBmq3G-OkB1g8bA3sxgIqxSoPgyAnLxaBaG23G9c7XAjEKexLxw4idCF3LdwD0ziLtlzK4A12ypLfMJ7yp58Wn0VncR1ISCMhz8dYUJzsZ3NIPYXeWQ70R4g"
                  alt="Primary product"
                />
                <div className="absolute inset-0 bg-admin-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon name="edit" className="text-admin-on-primary" style={{ fontSize: '28px' }} />
                </div>
                <div className="absolute bottom-2 left-2 bg-admin-surface-container-lowest px-2 py-1 font-sans text-[10px] uppercase tracking-widest border border-admin-outline-variant">Primary</div>
              </div>
              <div className="relative group cursor-pointer border border-admin-outline-variant aspect-square">
                <AdminImage
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD98TEje5LEbhEzEHAom7d-Z8PzKT-Q3jUQVRks-figEKYTg66eoziC3IVI3Wrv8vL80SdREbHWgqecfwHFm1X2gLAOpNyu0RIL8DxeOIwE7hEcVlNYuaRW8Am_hYr2u4K_8TSSYcSEX1nZPj-jJ6tMw9NddcOUCi0OrAt3z5uzNTlnDsfrdbonlnhfwUf3RsxLLAUtzbyUO5ZAdk8OAWzv58B7chtf0CACJe_Sq9-Z1NvnaO2FDTfEPQ"
                  alt="Secondary product"
                />
              </div>
              <div className="relative group cursor-pointer border border-admin-outline-variant aspect-square flex flex-col items-center justify-center bg-admin-surface-container-low hover:bg-admin-surface-variant transition-colors border-dashed">
                <Icon name="cloud_upload" className="text-admin-outline mb-2" style={{ fontSize: '24px' }} />
                <span className="font-sans text-[10px] uppercase tracking-widest text-center px-2 text-admin-outline">Upload<br />Image</span>
              </div>
              <div className="relative group cursor-pointer border border-admin-outline-variant aspect-square flex flex-col items-center justify-center bg-admin-surface-container-low hover:bg-admin-surface-variant transition-colors border-dashed">
                <Icon name="add_photo_alternate" className="text-admin-outline" style={{ fontSize: '24px' }} />
              </div>
            </div>
          </div>);}
