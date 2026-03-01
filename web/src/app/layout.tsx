import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AppToaster } from '@/components/ui/toaster';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
