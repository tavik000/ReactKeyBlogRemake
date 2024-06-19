import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { RoundButton } from './button';

export default function PostSection() {
    return (
        <div className="post-section" >
            <div className="divide-line">
                <h1 className="absolute ml-10 -top-20 text-4xl">Key Blog</h1>
            </div>
            <span className="bg"></span>
            <div className="options flex flex-row">
                <div className="flex flex-row w-1/2"></div>
                <div className="flex flex-row justify-end w-1/2">
                    <RoundButton>Home</RoundButton>
                    <RoundButton>Login</RoundButton>
                    <RoundButton>EN</RoundButton>
                </div>
            </div>
            <div className="category flex md:flex-row mt-14">
                <div className="flex w-10/12 bg-white rounded-xl shadow-0550 pt-8 pl-6 pb-8 pr-6">
                    <div className="flex flex-col">
                        <p className="flex tracking-widest text-xl pb-4">CATEGORY</p>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <ul className="w-80">
                                    <li>
                                        <a className="text-sm" href="">All</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">Game Design</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">Game Dev General</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE5</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Beginner</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Audio</a>
                                    </li>
                                </ul>
                                <ul className="w-80">
                                    <li>
                                        <a className="text-sm" href="">UE/ C++</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Blueprint</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Animation</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Visual Effect</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Debug</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Localization</a>
                                    </li>
                                </ul>
                                <ul className="w-80">
                                    <li>
                                        <a className="text-sm" href="">UE/ Lighting</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Material</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ UMG</a>
                                    </li>
                                    <li>
                                        <a className="text-sm" href="">UE/ Optimization</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <p
                        // className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
                        className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}
                    >
                        <strong>Welcome to Acme.</strong> This is the example for the{' '}
                        <a href="https://nextjs.org/learn/" className="text-blue-500">
                            Next.js Learn Course
                        </a>
                        , brought to you by Vercel.
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    {/* Add Hero Images Here */}
                    <Image
                        src="/hero-desktop.png"
                        width={1000}
                        height={760}
                        alt="Screenshots of the dashboard project showing desktop version"
                        className="hidden md:block"
                    />
                    <Image
                        src="/hero-mobile.png"
                        width={560}
                        height={620}
                        alt="Screenshot of the dashboard project showing mobile version"
                        className="block md:hidden"
                    />
                </div>
            </div>
        </div >

    );
}