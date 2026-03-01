'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/page-header';
import { Topbar } from '@/components/topbar';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table';
import { api } from '@/lib/api';

export default function MerchantsPage() {
  const [list, setList] = useState<any[]>([]); const [loading, setLoading] = useState(true); const [f, setF] = useState({ name:'', address:'', lat:'', lng:'' });
  const load = async()=>{ setLoading(true); try{ setList(await api.merchants.list()); } catch(e:any){ toast.error(e.message);} finally{setLoading(false);} };
  useEffect(()=>{ load(); },[]);
  const create = async()=>{ if(!f.name||!f.address||!f.lat||!f.lng) return toast.error('请填写完整'); await api.merchants.create({ ...f, lat:Number(f.lat), lng:Number(f.lng) }); toast.success('创建成功'); setF({ name:'', address:'', lat:'', lng:'' }); load(); };
  return <><Topbar title='商家管理'/><PageHeader title='商家列表' desc='管理入驻商家信息'/><div className='rounded-2xl border bg-card p-6 shadow-sm'><div className='mb-4 flex justify-end gap-2'><Button variant='outline' onClick={load}>刷新</Button><DialogRoot><DialogTrigger asChild><Button>新增商家</Button></DialogTrigger><DialogContent><DialogTitle>新增商家</DialogTitle><div className='space-y-2 mt-3'><Input required placeholder='名称' value={f.name} onChange={e=>setF({...f,name:e.target.value})}/><Input required placeholder='地址' value={f.address} onChange={e=>setF({...f,address:e.target.value})}/><Input required placeholder='纬度' value={f.lat} onChange={e=>setF({...f,lat:e.target.value})}/><Input required placeholder='经度' value={f.lng} onChange={e=>setF({...f,lng:e.target.value})}/><Button className='w-full' onClick={create}>提交</Button></div></DialogContent></DialogRoot></div>{loading?<Skeleton className='h-40 w-full'/>:list.length===0?<EmptyState text='暂无商家'/>:<Table><THead><Tr><Th>ID</Th><Th>名称</Th><Th>地址</Th></Tr></THead><TBody>{list.map(i=><Tr key={i.id}><Td>{i.id}</Td><Td>{i.name}</Td><Td>{i.address}</Td></Tr>)}</TBody></Table>}</div></>;
}
