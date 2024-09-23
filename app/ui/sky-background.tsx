import { sniglet } from "./fonts";
import { forwardRef } from "react";

export const SkyBackground = forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(function SkyBackground(_, ref) {
    return (
        <div className="sky-background" ref={ref}>
            <div className="cloud cloud-large cloud-1"></div>
            <div className="cloud cloud-medium cloud-2">
                <div className="waddle-dee-the-second">
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
                </div>
            </div>
            <div className="cloud cloud-3"></div>
            <div className="cloud cloud-medium cloud-4"></div>
            <div className="cloud cloud-large cloud-5"></div>
            <div className="cloud cloud-medium cloud-6"></div>
            <div className="cloud cloud-7"></div>
            <div className="cloud cloud-large cloud-8"></div>
            <div className="cloud cloud-mediumcloud-9"></div>
            <div className="cloud cloud-10"></div>
            <div className="cloud cloud-medium cloud-11"></div>
            <div className="cloud cloud-large cloud-12"></div>
            <div className="cloud cloud-13"></div>
            {/* <div className="cloud cloud-10"></div> */}

            {/* <div className="star-block star-block-1"><div className="star-block-star"></div></div>
            <div className="star-block star-block-2"><div className="star-block-star"></div></div>
            <div className="star-block star-block-3"><div className="star-block-star"></div></div>
            <div className="star-block star-block-4"><div className="star-block-star"></div></div>
            <div className="star-block star-block-5"><div className="star-block-star"></div></div> */}
        </div>

    )
});