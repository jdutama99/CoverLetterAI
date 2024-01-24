import Image from 'next/image';
import HeroImage from '../public/hero.webp';
import Logo from '../components/Logo/Logo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-screen h-screen overflow-hidden flex justify-center items-center relative'>
      <Image src={HeroImage} alt='Hero Image' fill className='absolute' />
      <div className='relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-sm backdrop-blur-sm'>
        <Logo />
        <p>
          The Ai-Powered SAAS solution to generate SEO-Optimized Blog posts in
          minutes. Get high-quality content, without sacrificing your time.
        </p>
        <Link href='/post/new' className='btn mt-5'>
          Get Started
        </Link>
      </div>
    </div>
  );
}
