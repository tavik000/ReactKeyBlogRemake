'use client';
import { forwardRef, useEffect, useRef } from 'react';
import React from 'react';
import './bear.css';
import clsx from 'clsx';

interface BearProps {
    isSitting: boolean;
    isActive: boolean;
}

export const Bear = forwardRef<HTMLDivElement, BearProps>(
    function Bear({ isSitting, isActive }, ref) {

        const className = clsx('curious-bear', {
            'is-sitting': isSitting,
            'hidden': !isActive,
            '': isActive
        });

        // init cursor position
        let cursorPos = { x: 0, y: 0 };

        const mousemove = (e: { clientX: any; clientY: any; }) => {
            cursorPos = { x: e.clientX, y: e.clientY }
            updateFollow();
        }

        const followCursor = (el: Element, xRatio: number, yRatio: number) => {
            const elOffset = el.getBoundingClientRect();
            const centerX = elOffset.x + elOffset.width / 2;
            const centerY = elOffset.y + elOffset.height / 2;
            const distanceLeft = Math.round(((cursorPos.x - centerX) * 100) / window.innerWidth);
            const distanceTop = Math.round(((cursorPos.y - centerY) * 100) / window.innerHeight);
            (el as HTMLElement).style.transform = `translate(${distanceLeft / xRatio}px, ${distanceTop / yRatio}px)`;
        }

        const updateFollow = () => {
            const eyes = document.querySelector(".eyes");
            const blushes = document.querySelector(".blushes");
            const bearBlushes = document.querySelectorAll(".bear-blush");
            const bearEyes = document.querySelectorAll(".bear-eye");
            const head = document.querySelector(".head");
            const ears = document.querySelector(".ears");
            const nose = document.querySelector(".nose");
            const snout = document.querySelector(".snout");
            const ballon = document.querySelector(".ballon");

            if (ears) followCursor(ears, -4, -4);
            if (head) followCursor(head, 6, 6);
            if (eyes) followCursor(eyes, 4.8, 4.8);
            if (blushes) followCursor(blushes, 4.8, 4.8);
            if (snout) followCursor(snout, 2.25, 2.85);
            if (nose) followCursor(nose, 1.5, 1.8);
            if (ballon) followCursor(ballon, 15, 15);

            if (bearBlushes && bearBlushes.length > 0) {
                bearBlushes.forEach(blush => {
                    (blush as HTMLElement).style.top = "-9.15rem";
                });
            }

            if (bearEyes && bearEyes.length > 0) {
                bearEyes.forEach(eye => {
                    (eye as HTMLElement).style.top = "-10.5rem";
                });
            }
        }

        useEffect(() => {
            window.addEventListener("mousemove", mousemove);

            return () => {
                window.removeEventListener("mousemove", mousemove);
            };
        }, []);

        return (
            <div id="curious-bear"
                className={className}
                // className="translate-x-24"
                ref={ref}>
                <div className="bear">
                    <div className='ballon'>
                        <div className="ball rotate-12 translate-x-6">
                            <div className="rope"></div>
                        </div>
                        <div className="ball -rotate-12 -translate-x-6">
                            <div className="rope"></div>
                        </div>
                        <div className="ball -translate-y-1">
                            <div className="rope"></div>
                        </div>
                    </div>

                    <svg className="w-32" xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 446.4 686.5">
                        <title>Curious Bear</title>
                        <g id="bear">
                            {isSitting && (
                                <ellipse cx="223.2" cy="637.6" rx="223.2" ry="29" fill="#F1C0C" opacity="0.3" />
                            )}
                            <g id="body">
                                <path d="M376.3,460.3c0,63.2-17.1,120.3-44.7,161.4h0l-4.5,6.5a18.9,18.9,0,0,1-13,5.1H260.5a19.1,19.1,0,0,1-19-19V553.2a124.2,124.2,0,0,1-30.5.3v62a19.1,19.1,0,0,1-19,19H138.5a19,19,0,0,1-15.2-7.6l-0.5-.7C93.4,584.6,75.1,525.7,75.1,460.3c0-125.3,67.4-226.9,150.6-226.9S376.3,335,376.3,460.3Z" fill="#f6ac29" />
                                <path d="M211,596.9v18.4a19.1,19.1,0,0,1-19,19H138.5a19,19,0,0,1-15.2-7.7l-0.5-.7C93.4,584.6,75.1,525.7,75.1,460.3q0-4.6.1-9.2c1.6,61.6,19.6,117,47.5,156.4l0.5,0.8a19,19,0,0,0,15.2,7.7H192A19.1,19.1,0,0,0,211,596.9Z" fill="#b97f1c" />
                                <path d="M376.3,459.3c0,63.1-17.1,120.3-44.7,161.4h0l-4.5,6.5a18.9,18.9,0,0,1-13,5.2H260.5a19.1,19.1,0,0,1-19-19V594.9a19.1,19.1,0,0,0,19,19H314a18.9,18.9,0,0,0,13-5.2l4.5-6.5h0c26.3-39.1,43-92.7,44.6-152.2Q376.3,454.7,376.3,459.3Z" fill="#b97f1c" />
                                <path id="body-stroke" d="M376.3,460.3c0,63.2-17.1,120.3-44.7,161.4h0l-4.5,6.5a18.9,18.9,0,0,1-13,5.1H260.5a19.1,19.1,0,0,1-19-19V553.2a124.2,124.2,0,0,1-30.5.3v62a19.1,19.1,0,0,1-19,19H138.5a19,19,0,0,1-15.2-7.6l-0.5-.7C93.4,584.6,75.1,525.7,75.1,460.3c0-125.3,67.4-226.9,150.6-226.9S376.3,335,376.3,460.3Z" fill="none" stroke="#3f1c0d" strokeMiterlimit="10" strokeWidth="10" />
                                <path id="arm-right" d="M294.1,283h0a41.6,41.6,0,0,1,56.7,15.2l67.1,116.3a41.6,41.6,0,0,1-15.2,56.7h0A41.6,41.6,0,0,1,346.1,456L322,414.3Z" fill="#f6ac29" />
                                <path id="arm-right-shadow" d="M325,410.8s15.1,34.1,20.8,45.2c7,13.6,21.7,20.7,36,20.7a41.1,41.1,0,0,0,20.6-5.5A41.6,41.6,0,0,0,422,425.6a41.3,41.3,0,0,1-40.2,32c-14.4,0-25.5-10.5-35-22.6C332.9,417.4,325,410.8,325,410.8Z" fill="#b97f1c" />
                                <path id="arm-left" d="M152.4,283h0a41.6,41.6,0,0,0-56.7,15.2L28.6,414.5a41.6,41.6,0,0,0,15.2,56.7h0A41.6,41.6,0,0,0,100.5,456l25.5-42.1Z" fill="#f6ac29" />
                                <path id="arm-left-shadow" d="M121.2,410.8s-15.1,34.1-20.8,45.2c-7,13.6-21.7,20.7-36,20.7a41.1,41.1,0,0,1-20.6-5.5,41.6,41.6,0,0,1-19.6-45.5,41.3,41.3,0,0,0,40.2,32c14.4,0,25.5-10.5,35-22.6C113.3,417.4,121.2,410.8,121.2,410.8Z" fill="#b97f1c" />
                                <path id="neck-shadow" d="M351.9,300.1c-33.4,19.3-78.7,27.6-128.6,27.6s-95.2-8.3-128.6-27.6l1.1-1.9a41.6,41.6,0,0,1,40.4-20.5c25-27.9,56-44.4,89.5-44.4s64.3,16.4,89.3,44.1a41.6,41.6,0,0,1,35.9,20.7Z" fill="#b97f1c" />
                                <path id="arm-right-stroke" d="M294.1,283h0a41.6,41.6,0,0,1,56.7,15.2l67.1,116.3a41.6,41.6,0,0,1-15.2,56.7h0A41.6,41.6,0,0,1,346.1,456L322,414.3" fill="none" stroke="#3f1c0d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10" />
                                <path id="arm-left-stroke" d="M152.4,283h0a41.6,41.6,0,0,0-56.7,15.2L28.6,414.5a41.6,41.6,0,0,0,15.2,56.7h0A41.6,41.6,0,0,0,100.5,456l24.1-41.7" fill="none" stroke="#3f1c0d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10" />
                                <path id="belly" d="M304.8,435.8c0,46.9-36.5,85-81.5,85s-81.5-38-81.5-85S179.5,332,224.5,332,304.8,388.9,304.8,435.8Z" fill="#ffeed5" />
                                <path d="M299.4,504.7a33,33,0,0,1-.4,4.9c-3.7,24.9-35.1,44.4-73.4,44.4s-69.8-19.5-73.4-44.5a32.7,32.7,0,0,1-.3-4.8h0a2.4,2.4,0,0,1,4.5-1.2c10.3,18.9,37.4,32.4,69.3,32.4s58.9-13.5,69.3-32.4a2.4,2.4,0,0,1,4.5,1.2h0Z" fill="#b97f1c" />
                                <path d="M165.7,533.3c39.9,27.3,80.5,27.7,120,0" fill="none" stroke="#3f1c0d" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="10" />
                            </g>
                            <g id="head" className="head">
                                <g id="ears" className="ears">
                                    <g>
                                        <circle cx="92.2" cy="53.9" r="48.9" fill="#f6ac29" stroke="#3f1c0d" strokeMiterlimit="10" strokeWidth="10" />
                                        <circle cx="93.1" cy="53.9" r="31.9" fill="#ffeed5" />
                                    </g>
                                    <g>
                                        <circle cx="351.6" cy="53.9" r="48.9" fill="#f6ac29" stroke="#3f1c0d" strokeMiterlimit="10" strokeWidth="10" />
                                        <circle cx="352.5" cy="53.9" r="31.9" fill="#ffeed5" />
                                    </g>
                                </g>
                                <path d="M409.6,176.9c0,94.7-83.5,130.1-186.4,130.1S36.8,271.6,36.8,176.9,120.3,5.4,223.2,5.4,409.6,82.2,409.6,176.9Z" fill="#f6ac29" />
                                <path id="head-stroke" d="M409.6,176.9c0,94.7-83.5,130.1-186.4,130.1S36.8,271.6,36.8,176.9,120.3,5.4,223.2,5.4,409.6,82.2,409.6,176.9Z" fill="none" stroke="#3f1c0d" strokeMiterlimit="10" strokeWidth="10" />
                                {/* <g id="eyes" className="eyes">
                                    <circle cx="291.1" cy="138" r="16.8" fill="#3f1c0c" />
                                    <circle cx="287.3" cy="134.2" r="4.8" fill="#884d3a" />
                                    <circle cx="155.3" cy="138" r="16.8" fill="#3f1c0c" />
                                    <circle cx="152.3" cy="134.2" r="4.8" fill="#884d3a" />
                                    <path d="M117.1,106.7l0.5-2.2,0.3-1.1,0.6-1.5a23.6,23.6,0,0,1,1.6-3.5l1.1-1.9,1.3-1.9,0.7-1,0.8-.9,1.7-1.9a33.4,33.4,0,0,1,14.1-8.3,36.2,36.2,0,0,1,5.3-1.1l2.6-.2h4.8l2.1,0.4,1.9,0.4,1.7,0.5,1.5,0.5,1.2,0.5,2.2,1.1a3.2,3.2,0,0,1-1.7,6h-0.4l-2-.2h-6.9l-1.7.2h-0.9l-0.9.2-1.9.3c-1.3.4-2.6,0.6-3.8,1.1a40.3,40.3,0,0,0-3.8,1.5,39.5,39.5,0,0,0-6.9,4.3l-1.4,1.3-0.7.6-0.6.7-1.2,1.3-1,1.3-1,1.2-0.8,1.1-0.7.9-0.6,1-1.2,1.9A3.2,3.2,0,0,1,117.1,106.7Z" fill="#3f1c0d" />
                                    <path d="M323.4,109.2l-1.2-1.9-0.6-1-0.7-.9-0.8-1.1-1-1.2-1-1.3-1.2-1.3-0.6-.7-0.7-.6-1.4-1.3a31.6,31.6,0,0,0-10.7-5.8c-1.3-.5-2.6-0.7-3.8-1.1l-1.9-.3-0.9-.2h-0.9l-1.7-.2h-6.9l-2,.2h-0.4a3.2,3.2,0,0,1-1.7-6l2.2-1.1,1.2-.5,1.5-.5,1.7-.5,1.9-.4,2.1-.4h4.8l2.6,0.2a36.2,36.2,0,0,1,5.3,1.1,35.1,35.1,0,0,1,14.1,8.3l1.7,1.9,0.8,0.9,0.7,1,1.3,1.9,1.1,1.9a23.6,23.6,0,0,1,1.6,3.5l0.6,1.5,0.3,1.1,0.5,2.2A3.2,3.2,0,0,1,323.4,109.2Z" fill="#3f1c0d" />
                                </g> */}
                                <g>
                                    <path className="snout" d="M308.5,230c0,43.6-40.2,52.6-87.3,52.6s-83.3-9-83.3-52.6,38.2-79,85.3-79S308.5,186.3,308.5,230Z" fill="#ffeed5" />
                                    <g className="nose">
                                        <path d="M197.6,187.5c0-11.1,11.5-11.7,25.6-11.7s25.6,0.7,25.6,11.7-11.5,20-25.6,20S197.6,198.6,197.6,187.5Z" fill="#3f1c0c" />
                                        <path d="M227.5,201a13.9,13.9,0,0,1,.2,1.7v4.6a109.6,109.6,0,0,1-.4,14.3c-0.1,1.3-.3,2.6-0.5,3.9s-0.4,2.6-.7,3.8a34.2,34.2,0,0,1-.9,3.5,32.6,32.6,0,0,1-1.2,3,23.6,23.6,0,0,1-1.3,2.4l-1.2,1.8-1.2,1.4a2,2,0,0,1-3.5-1.6v-0.2s0.1-.6.3-1.7,0.2-1.1.3-1.8,0.3-1.5.4-2.4,0.1-.9.2-1.3,0.2-.9.2-1.4,0.3-2,.4-3.1,0.3-2.2.3-3.3,0.1-2.3.1-3.5a101.1,101.1,0,0,0-1-13.1q-0.4-2.7-.6-4.3a13.9,13.9,0,0,1-.2-1.7A5,5,0,0,1,227.5,201Z" fill="#3f1c0d" />
                                        <path d="M233.7,244.2l-1.4.2-3.8.3H223l-3.1-.3-3.2-.4a46.8,46.8,0,0,1-6.2-1.4,53.2,53.2,0,0,1-5.3-1.9l-2-1-1.5-1-1.2-1a2.1,2.1,0,0,1,1.3-3.6h3.2l2,0.2,2.4,0.4,2.6,0.4L218,236l5.8,0.9,5.1,1,3.6,0.9,1.4,0.4A2.6,2.6,0,0,1,233.7,244.2Z" fill="#3f1c0d" />
                                        <ellipse cx="223.4" cy="183.3" rx="11.7" ry="3.5" fill="#884d3a" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <div className="blushes">
                        <div className="bear-blush bear-blush-left"></div>
                        <div className="bear-blush bear-blush-right"></div>
                    </div>
                    <div className="eyes w-auto h-auto">
                        <div id="eyes" className="bear-eye bear-eye-left"></div>
                        <div id="eyes" className="bear-eye bear-eye-right"></div>
                    </div>
                </div>
            </div>

        );
    },
);