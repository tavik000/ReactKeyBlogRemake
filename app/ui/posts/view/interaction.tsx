import Link from "next/link";

export const InteractIcon = ({
  count,
  shouldShowCount,
  children,
}: {
  count: number;
  shouldShowCount: boolean;
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
                <p className="flex">{count}</p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};