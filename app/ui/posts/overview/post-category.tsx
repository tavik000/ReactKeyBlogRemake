import { DictStructure } from '@/app/components/localization/dict-store';

export default function PostCategory({ dict }: { dict: DictStructure }) {
  return (
    <div className="category mt-6 flex md:flex-row">
      <div className="flex w-10/12 max-w-1140px basis-2/3 rounded-xl bg-white px-12 pb-8 pt-8 shadow-0550">
        <div className="flex flex-col">
          <p className="flex pb-4 text-xl tracking-widest">{dict.category}</p>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <ul className="w-80">
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    All
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    Game Design
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    Game Dev General
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE5
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Beginner
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Audio
                  </a>
                </li>
              </ul>
              <ul className="w-80">
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ C++
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Blueprint
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Animation
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Visual Effect
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Debug
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Localization
                  </a>
                </li>
              </ul>
              <ul className="w-80">
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Lighting
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Material
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ UMG
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    UE/ Optimization
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    Unity
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    Web
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:text-orange-500" href="">
                    Other
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
