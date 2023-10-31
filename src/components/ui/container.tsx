import clsx from "clsx";
import type { PropsWithChildren } from "react";

export function Container({
  tag = "div",
  children,
  className,
}: PropsWithChildren & { tag?: string; className?: string }) {
  const Tag = tag as "div";

  return (
    <Tag
      className={clsx(
        "flex max-w-7xl w-full px-4 md:px-8 mx-auto flex-wrap",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
