import React from "react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export const InteractIcon = ({
  count,
  shouldShowCount,
  tooltipContent,
  children,
}: {
  count: number;
  shouldShowCount: boolean;
  tooltipContent?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="inline-block flex-shrink-0 w-16 py-2 px-0.5 break-words">
      <div className="flex flex-row content-center">
        <div className="relative mr-1">
          <span>
            <div className="inline-block align-middle">{children}</div>
          </span>
        </div>
        {shouldShowCount && (
          <div className="block break-words">
            <div className="inline-block">
              <p
                className="flex"
                data-tooltip-id="count-tooltip"
                data-tooltip-content={`${tooltipContent}`}>
                  {count}
              </p>
              <Tooltip id="count-tooltip" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};