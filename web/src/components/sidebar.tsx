'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Building2, LayoutDashboard, ShoppingCart, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: '总览', icon: LayoutDashboard },
  { href: '/dashboard/merchants', label: '商家', icon: Building2 },
  { href: '/dashboard/services', label: '服务', icon: Store },
  { href: '/dashboard/orders', label: '订单', icon: ShoppingCart },
  { href: '/dashboard/ai-copy', label: 'AI文案', icon: Bot }
];

export function Sidebar() {
  const pathname = usePathname();
  return <aside className='w-60 border-r bg-card p-4'>{items.map(i => <Link key={i.href} href={i.href} className={cn('mb-2 flex items-center gap-2 rounded-lg px-3 py-2', pathname===i.href ? 'bg-primary text-primary-foreground':'hover:bg-muted')}><i.icon size={16}/>{i.label}</Link>)}</aside>;
}
