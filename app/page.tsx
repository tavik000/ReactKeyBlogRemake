import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import WaddleDee from './ui/waddle-dee';
import SkyBackground from './ui/sky-background';
import PostSection from './ui/post-section';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <WaddleDee />
      <SkyBackground />
      <PostSection />
    </main>
  );
}
