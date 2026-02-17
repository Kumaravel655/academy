'use client';

import { useEffect } from 'react';
import { initializeDemoAccount } from '@/lib/init-demo';

export default function DemoInit() {
  useEffect(() => {
    initializeDemoAccount();
  }, []);

  return null;
}
