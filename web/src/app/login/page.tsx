'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (type: 'login' | 'register') => {
    if (!username || !password) return toast.error('请填写账号密码');
    setLoading(true);
    try {
      const res = type === 'login' ? await api.login({ username, password }) : await api.register({ username, password });
      setToken(res.access_token);
      toast.success('登录成功');
      location.href = '/dashboard';
    } catch (e: any) {
      toast.error(e.message || '失败');
    } finally { setLoading(false); }
  };

  return <main className='flex min-h-screen items-center justify-center bg-muted/50 p-4'><div className='w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm'><TabsRoot defaultValue='login'><TabsList className='mb-4 grid grid-cols-2'><TabsTrigger value='login'>登录</TabsTrigger><TabsTrigger value='register'>注册</TabsTrigger></TabsList><div className='space-y-3'><Input required placeholder='用户名' value={username} onChange={e=>setUsername(e.target.value)} /><Input required type='password' placeholder='密码' value={password} onChange={e=>setPassword(e.target.value)} /></div><TabsContent value='login'><Button className='mt-4 w-full' disabled={loading} onClick={()=>submit('login')}>{loading?'提交中...':'登录'}</Button></TabsContent><TabsContent value='register'><Button className='mt-4 w-full' disabled={loading} onClick={()=>submit('register')}>{loading?'提交中...':'注册并登录'}</Button></TabsContent></TabsRoot></div></main>;
}
