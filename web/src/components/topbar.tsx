'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { clearToken } from '@/lib/auth';

export function Topbar({ title }: { title: string }) {
  const { setTheme, theme } = useTheme();
  return <header className='mb-4 flex items-center justify-between'><h1 className='text-2xl font-bold'>{title}</h1><div className='flex gap-2'><Button variant='outline' onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</Button><Button variant='secondary' onClick={()=>{clearToken(); location.href='/login';}}>退出</Button></div></header>;
}
