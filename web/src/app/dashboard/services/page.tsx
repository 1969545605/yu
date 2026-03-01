'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';
import { Topbar } from '@/components/topbar';

export default function ServicesPage() {
  const [list,setList]=useState<any[]>([]); const [loading,setLoading]=useState(true); const [q,setQ]=useState(''); const [category,setCategory]=useState(''); const [detail,setDetail]=useState<any>(null);
  const [f,setF]=useState({ merchant_id:'', title:'', category:'', tags:'', price:''});
  const load=async()=>{ setLoading(true); try{ setList(await api.services.list({q,category})); } catch(e:any){toast.error(e.message);} finally{setLoading(false);} };
  useEffect(()=>{load();},[]);
  const create=async()=>{ if(!f.merchant_id||!f.title||!f.category||!f.price) return toast.error('请填写完整'); await api.services.create({ ...f, merchant_id:Number(f.merchant_id), price:Number(f.price)}); toast.success('创建成功'); load(); };
  const openDetail=async(id:number)=> setDetail(await api.services.detail(id));
  return <><Topbar title='服务管理'/><div className='rounded-2xl border bg-card p-6 shadow-sm'><div className='mb-4 flex gap-2'><Input placeholder='分类' value={category} onChange={e=>setCategory(e.target.value)}/><Input placeholder='搜索标题/标签' value={q} onChange={e=>setQ(e.target.value)}/><Button variant='outline' onClick={load}>查询</Button><DialogRoot><DialogTrigger asChild><Button>新增服务</Button></DialogTrigger><DialogContent><DialogTitle>新增服务</DialogTitle><div className='space-y-2 mt-3'><Input required placeholder='商家ID' value={f.merchant_id} onChange={e=>setF({...f,merchant_id:e.target.value})}/><Input required placeholder='标题' value={f.title} onChange={e=>setF({...f,title:e.target.value})}/><Input required placeholder='分类' value={f.category} onChange={e=>setF({...f,category:e.target.value})}/><Input placeholder='标签' value={f.tags} onChange={e=>setF({...f,tags:e.target.value})}/><Input required placeholder='价格' value={f.price} onChange={e=>setF({...f,price:e.target.value})}/><Button className='w-full' onClick={create}>提交</Button></div></DialogContent></DialogRoot></div>{loading?<Skeleton className='h-40 w-full'/>:list.length===0?<EmptyState text='暂无服务'/>:<Table><THead><Tr><Th>ID</Th><Th>标题</Th><Th>分类</Th><Th>价格</Th><Th></Th></Tr></THead><TBody>{list.map(i=><Tr key={i.id}><Td>{i.id}</Td><Td>{i.title}</Td><Td>{i.category}</Td><Td>{i.price}</Td><Td><Button variant='outline' onClick={()=>openDetail(i.id)}>详情</Button></Td></Tr>)}</TBody></Table>}</div><DialogRoot open={!!detail} onOpenChange={()=>setDetail(null)}><DialogContent><DialogTitle>服务详情</DialogTitle><pre className='mt-3 rounded bg-muted p-3 text-xs'>{JSON.stringify(detail,null,2)}</pre></DialogContent></DialogRoot></>;
}
