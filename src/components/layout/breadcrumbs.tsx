"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);

  return (
    <nav className="container flex h-10 items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="transition-colors hover:text-foreground"
      >
        ホーム
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <Separator orientation="vertical" className="h-4" />
          <Link
            href={`/${paths.slice(0, index + 1).join('/')}`}
            className="transition-colors hover:text-foreground"
          >
            {path}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
} 