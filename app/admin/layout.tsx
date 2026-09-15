import type { ReactNode } from 'react';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'SAGI Admin', robots: { index: false, follow: false } };
export default function Layout({children}: {children:ReactNode}) { return <div className="admin-suite">{children}</div>; }
