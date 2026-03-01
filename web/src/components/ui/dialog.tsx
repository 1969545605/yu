'use client';
import * as Dialog from '@radix-ui/react-dialog';
export const DialogRoot = Dialog.Root; export const DialogTrigger = Dialog.Trigger; export const DialogContent = ({ className='', ...props }: any) => <Dialog.Portal><Dialog.Overlay className='fixed inset-0 bg-black/40'/><Dialog.Content className={`fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 ${className}`} {...props}/></Dialog.Portal>;
export const DialogTitle = Dialog.Title;
