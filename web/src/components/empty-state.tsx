export function EmptyState({ text = '暂无数据' }: { text?: string }) { return <div className='rounded-xl border border-dashed p-8 text-center text-muted-foreground'>{text}</div>; }
