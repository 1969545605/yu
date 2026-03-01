import { http } from './http';

export const api = {
  login: (data: { username: string; password: string }) => http<{ access_token: string; token_type: string }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: { username: string; password: string }) => http<{ access_token: string; token_type: string }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  merchants: {
    list: () => http<any[]>('/merchants'),
    create: (data: any) => http<any>('/merchants', { method: 'POST', body: JSON.stringify(data) })
  },
  services: {
    list: (params: { category?: string; q?: string; skip?: number; limit?: number }) => {
      const search = new URLSearchParams();
      if (params.category) search.set('category', params.category);
      if (params.q) search.set('q', params.q);
      search.set('skip', String(params.skip ?? 0));
      search.set('limit', String(params.limit ?? 20));
      return http<any[]>(`/services?${search.toString()}`);
    },
    create: (data: any) => http<any>('/services', { method: 'POST', body: JSON.stringify(data) }),
    detail: (id: number) => http<any>(`/services/${id}`)
  },
  orders: {
    list: () => http<any[]>('/orders'),
    create: (data: any) => http<any>('/orders', { method: 'POST', body: JSON.stringify(data) })
  },
  aiCopy: (data: any) => http<{ prompt: string; copywriting: string }>('/ai/copywriting', { method: 'POST', body: JSON.stringify(data) })
};
