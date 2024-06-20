
export default function Category() {
  return (
    <div className="category mt-14 flex md:flex-row">
      <div className="flex w-10/12 rounded-xl bg-white pb-8 pl-6 pr-6 pt-8 shadow-0550">
        <div className="flex flex-col">
          <p className="flex pb-4 text-xl tracking-widest">CATEGORY</p>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <ul className="w-80">
                <li>
                  <a className="text-sm" href="">
                    All
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    Game Design
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    Game Dev General
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE5
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Beginner
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Audio
                  </a>
                </li>
              </ul>
              <ul className="w-80">
                <li>
                  <a className="text-sm" href="">
                    UE/ C++
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Blueprint
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Animation
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Visual Effect
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Debug
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Localization
                  </a>
                </li>
              </ul>
              <ul className="w-80">
                <li>
                  <a className="text-sm" href="">
                    UE/ Lighting
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Material
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ UMG
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
                    UE/ Optimization
                  </a>
                </li>
                <li>
                  <a className="text-sm" href="">
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
