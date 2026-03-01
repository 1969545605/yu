'use client';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div className='flex min-h-screen bg-muted/40'><Sidebar /><main className='flex-1 p-6'>{children}</main></div>;
}
