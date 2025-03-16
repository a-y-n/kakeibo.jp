import Link from 'next/link';
import { NavigationMenu } from '@/components/layout/navigation-menu';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Button } from '@/components/ui/button';

export function Header({ showBreadcrumbs = false }: { showBreadcrumbs?: boolean }) {
  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Kakeibo Design</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <NavigationMenu />
        </div>
      </div>
      {showBreadcrumbs && <Breadcrumbs />}
    </header>
  );
} 