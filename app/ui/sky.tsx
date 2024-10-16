"use client";
import { SkyBackground } from "./sky-background";
import React, { useState, useRef, useEffect } from "react";
import PostHeader from "./posts/general/post-header";
import { WaddleDee } from "./waddle-dee";
import { Bear, CuriousBear } from "./bear";
import { getCurrentDeviceWidthType } from "../lib/utils";

export default function Sky() {
  const skyBackgroundRef = useRef<HTMLDivElement | null>(null);

  const [isBearActive, setBearActive] = useState<boolean>(false);
  const [isSitting, setSit] = useState<boolean>(false);
  const [groundPosHeight, setGroundPosHeight] = useState<number>(0);
  const curiousBearRef = useRef<HTMLDivElement | null>(null);
  const curiousBearTopCache = useRef<number>(0);
  const sitTopOffset = -100;

  useEffect(() => {
    const toggleSit = (newValue: boolean) => {
      if (!skyBackgroundRef.current) {
        throw new Error("skyBackgroundRef is not defined");
      }

      if (!curiousBearRef.current) {
        throw new Error("toggleSit: curiousBearRef is not defined");
      }
      const groundPosHeight = skyBackgroundRef.current.getBoundingClientRect().height;

      const curiousBearTop = curiousBearRef.current.getBoundingClientRect().top;
      if (curiousBearTopCache.current === 0) {
        curiousBearTopCache.current = curiousBearTop;
      }

      if (curiousBearTop === 0) {
        return;
      }

      // bear

      // Waddle dee
      // const sitTopOffset = 0;
      const sitPosY = groundPosHeight - curiousBearTopCache.current + sitTopOffset;

      if (newValue) {
        curiousBearRef.current.style.top = sitPosY + "px";
      } else {
        curiousBearRef.current.style.top = "";
      }
      setSit(newValue);
    };

    const handleScroll = () => {
      checkAndToggleSit();
    };

    const handleResize = () => {
      if (window.matchMedia("(pointer: coarse)").matches) {
        return;
      }
      checkAndRelocateBear();
    };

    const handleOrientationChange = () => {
      checkAndRelocateBear();
    };

    const checkAndRelocateBear = () => {
      if (!curiousBearRef.current) {
        throw new Error("checkAndToggleSit: curiousBearRef is not defined");
      }
      if (curiousBearRef.current.classList.contains("is-sitting")) {
        curiousBearRef.current.style.display = "none";
        setTimeout(() => {
          if (!skyBackgroundRef.current) {
            console.error("skyBackgroundRef is not defined");
            return;
          }
          if (!curiousBearRef.current) {
            throw new Error("checkAndToggleSit: curiousBearRef is not defined");
          }
          const groundPosHeight = skyBackgroundRef.current.getBoundingClientRect().height;

          const sitPosY = groundPosHeight - curiousBearTopCache.current + sitTopOffset;
          curiousBearRef.current.style.top = sitPosY + "px";
          curiousBearRef.current.style.display = "block";
        }, 500);
      } else {
        curiousBearRef.current.style.display = "none";
        setTimeout(() => {
          if (!curiousBearRef.current) {
            throw new Error("checkAndToggleSit: curiousBearRef is not defined");
          }
          checkAndToggleSit();
          curiousBearRef.current.style.display = "block";
        }, 500);
      }
    };

    const checkAndToggleSit = () => {
      if (!skyBackgroundRef.current) {
        console.error("skyBackgroundRef is not defined");
        return;
      }

      if (!curiousBearRef.current) {
        throw new Error("checkAndToggleSit: curiousBearRef is not defined");
      }

      const groundPosHeight = skyBackgroundRef.current.getBoundingClientRect().height;
      setGroundPosHeight(groundPosHeight);

      // Waddle dee
      // const scrollOffset =
      //   groundPosHeight * 0.048 * (zoomLevel / defaultZoomLevel);

      // bear
      const scrollOffset = 516;

      // console.log("scrollOffset", scrollOffset, "groundPosHeight", groundPosHeight);

      // Log device width
      // const deviceWidthType = getCurrentDeviceWidthType(window.innerWidth);
      // console.log("deviceWidthType", deviceWidthType, "deviceWidth", window.innerWidth);

      if (window.scrollY + scrollOffset >= groundPosHeight) {
        if (!curiousBearRef.current.classList.contains("is-sitting")) {
          toggleSit(true);
        }
      } else {
        if (curiousBearRef.current.classList.contains("is-sitting")) {
          toggleSit(false);
        }
      }
    };

    setBearActive(true);
    checkAndToggleSit();
    // setTimeout(() => checkAndToggleSit(), 10);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [groundPosHeight, isBearActive, sitTopOffset]);

  return (
    <>
      <header>
        <PostHeader groundPosHeight={groundPosHeight} />
      </header>
      <main className="flex min-h-screen flex-col">
        {/* <WaddleDee
          isSitting={isSitting}
          isActive={isBearActive}
          ref={curiousBearRef}
        /> */}
        <CuriousBear isSitting={isSitting} isActive={isBearActive} ref={curiousBearRef} />
        <SkyBackground ref={skyBackgroundRef} />
      </main>
    </>
  );
}
