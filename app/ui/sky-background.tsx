import { Bear } from "./bear";
import { sniglet } from "./fonts";
import { forwardRef } from "react";

export const SkyBackground = forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(
  function SkyBackground(_, ref) {
    return (
      <div
        className="sky-background bg-custom-sky 
        dark:from-custom-dark-sky-top dark:to-custom-dark-sky-bot 
        w-full duration-300 dark:bg-gradient-to-b"
        ref={ref}
      >
        <div className="cloud cloud-large cloud-1 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-medium cloud-2 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud">
          <div
            className={`${sniglet.className} scroll-sign border-[5px] border-solid border-[#e2940a] bg-[#ffeed5] text-[#f6ac29]
                        dark:border-blue-500 dark:bg-blue-300 dark:text-gray-100`}
          >
            scroll
          </div>
          {/* <div className="waddle-dee-the-second">
                    <div className={`${sniglet.className} sign`}>
                        scroll
                    </div>
                    <div className="waddle-arm waddle-arm-left"></div>
                    <div className="waddle-arm waddle-arm-right"></div>
                    <div className="waddle-body">
                        <div className="waddle-face">
                            <div className="waddle-blush waddle-blush-left"></div>
                            <div className="waddle-blush waddle-blush-right"></div>
                            <div className="waddle-eye waddle-eye-left"></div>
                            <div className="waddle-eye waddle-eye-right"></div>
                        </div>
                    </div>
                    <div className="waddle-foot waddle-foot-left"></div>
                    <div className="waddle-foot waddle-foot-right"></div>
                </div> */}
        </div>
        <div className="cloud cloud-3 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-medium cloud-4 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-large cloud-5 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-medium cloud-6 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-7 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-large cloud-8 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-medium cloud-9 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-10 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-medium cloud-11 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-large cloud-12 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        <div className="cloud cloud-13 bg-custom-cloud before:bg-custom-cloud after:bg-custom-cloud dark:bg-custom-dark-cloud dark:before:bg-custom-dark-cloud dark:after:bg-custom-dark-cloud"></div>
        {/* <div className="cloud cloud-10"></div> */}

        {/* <div className="star-block star-block-1"><div className="star-block-star"></div></div>
            <div className="star-block star-block-2"><div className="star-block-star"></div></div>
            <div className="star-block star-block-3"><div className="star-block-star"></div></div>
            <div className="star-block star-block-4"><div className="star-block-star"></div></div>
            <div className="star-block star-block-5"><div className="star-block-star"></div></div> */}
      </div>
    );
  },
);
