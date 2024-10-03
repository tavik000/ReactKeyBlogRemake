import { DictStructure } from "@/app/components/localization/dict-store";
import { lusitana, sniglet } from "@/app/ui/fonts";
import { PagePath } from "@/app/ui/page-path";

export default function PostSection({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="post-section relative bg-gradient-to-b from-[#ffbd14] to-[#ffc862]
                before:absolute before:left-0 before:top-[-200px] before:h-[217px]
                before:w-full before:bg-transparent before:bg-[url('/ground-cloud.png')] dark:from-[#181a1b] 
              dark:to-[#363b3d] dark:before:bg-[url('/ground-cloud-dark.png')]"
    >
      <div className="divide-line">
        <h1
          id="blog-title"
          className={`blog-title ${sniglet.className} absolute -top-20 ml-10 text-5xl font-extrabold`}
        >
          Key Blog
        </h1>
      </div>
      <span className="bg"></span>
      <PagePath />
      {children}
    </div>
  );
}
