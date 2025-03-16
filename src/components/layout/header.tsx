import Link from 'next/link';
import { NavigationMenu } from '@/components/layout/navigation-menu';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';

export function Header({ showBreadcrumbs = false }: { showBreadcrumbs?: boolean }) {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ロゴ</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <NavigationMenu />
          <div className="flex items-center space-x-2">
            <Button variant="outline">ログイン</Button>
            <Button>新規登録</Button>
          </div>
        </div>
      </div>
      {showBreadcrumbs && <Breadcrumbs />}
    </header>
  );
} 