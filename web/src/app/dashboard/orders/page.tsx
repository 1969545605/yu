'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Topbar } from '@/components/topbar';
import { EmptyState } from '@/components/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TBody, Td, Th, THead, Tr } from '@/components/ui/table';

export default function OrdersPage(){
  const [list,setList]=useState<any[]>([]);const [loading,setLoading]=useState(true);const [serviceId,setServiceId]=useState('');const [amount,setAmount]=useState('');
  const load=async()=>{setLoading(true);try{setList(await api.orders.list());}catch(e:any){toast.error(e.message);}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);
  const create=async()=>{if(!serviceId||!amount)return toast.error('请填写完整');await api.orders.create({service_id:Number(serviceId),amount:Number(amount)});toast.success('下单成功');load();};
  return <><Topbar title='我的订单'/><div className='rounded-2xl border bg-card p-6 shadow-sm'><div className='mb-4 flex gap-2'><Input placeholder='service_id' value={serviceId} onChange={e=>setServiceId(e.target.value)}/><Input placeholder='amount' value={amount} onChange={e=>setAmount(e.target.value)}/><Button onClick={create}>下单</Button><Button variant='outline' onClick={load}>刷新</Button></div>{loading?<Skeleton className='h-40 w-full'/>:list.length===0?<EmptyState text='暂无订单'/>:<Table><THead><Tr><Th>ID</Th><Th>服务ID</Th><Th>金额</Th><Th>状态</Th></Tr></THead><TBody>{list.map(i=><Tr key={i.id}><Td>{i.id}</Td><Td>{i.service_id}</Td><Td>{i.amount}</Td><Td>{i.status}</Td></Tr>)}</TBody></Table>}</div></>;
}
