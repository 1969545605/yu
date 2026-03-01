'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function CopyButton({ text }: { text: string }) {
  return <Button variant='outline' onClick={async ()=>{await navigator.clipboard.writeText(text);toast.success('已复制');}}>复制</Button>;
}
