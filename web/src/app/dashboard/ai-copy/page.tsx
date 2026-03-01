'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { Topbar } from '@/components/topbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '@/components/copy-button';

export default function AICopyPage(){
  const [f,setF]=useState({service_id:'',scene:'detail',tone:'friendly',length:'medium',extra:''});
  const [res,setRes]=useState<{prompt:string;copywriting:string}|null>(null); const [loading,setLoading]=useState(false);
  const submit=async()=>{if(!f.service_id)return toast.error('请输入service_id'); setLoading(true); try{setRes(await api.aiCopy({ ...f, service_id:Number(f.service_id)})); toast.success('生成成功');}catch(e:any){toast.error(e.message);}finally{setLoading(false);}};
  return <><Topbar title='AI文案生成'/><div className='rounded-2xl border bg-card p-6 shadow-sm space-y-3'><Input placeholder='service_id' value={f.service_id} onChange={e=>setF({...f,service_id:e.target.value})}/><div className='grid grid-cols-3 gap-2'><Select value={f.scene} onChange={e=>setF({...f,scene:e.target.value})}><option value='detail'>detail</option><option value='banner'>banner</option><option value='short'>short</option><option value='seo'>seo</option></Select><Select value={f.tone} onChange={e=>setF({...f,tone:e.target.value})}><option value='friendly'>friendly</option><option value='formal'>formal</option><option value='trendy'>trendy</option></Select><Select value={f.length} onChange={e=>setF({...f,length:e.target.value})}><option value='short'>short</option><option value='medium'>medium</option><option value='long'>long</option></Select></div><Textarea placeholder='extra' value={f.extra} onChange={e=>setF({...f,extra:e.target.value})}/><Button disabled={loading} onClick={submit}>{loading?'生成中...':'生成文案'}</Button>{res&&<div className='grid gap-4 md:grid-cols-2'><div className='rounded-xl bg-muted p-4'><div className='mb-2 font-medium'>Prompt</div><p className='text-sm'>{res.prompt}</p></div><div className='rounded-xl bg-muted p-4'><div className='mb-2 flex items-center justify-between font-medium'><span>Copywriting</span><CopyButton text={res.copywriting}/></div><p className='text-sm whitespace-pre-wrap'>{res.copywriting}</p></div></div>}</div></>;
}
