import clsx from "clsx";
import { type FC, useState, type PropsWithChildren } from "react";
import { useStore } from "@nanostores/react";
import { isNavigationOpen } from "@/stores/navigation";
import { XCircle } from "lucide-react";

export interface NavigationProps extends PropsWithChildren {
  items: Array<{
    isActive?: boolean;
    href: string;
    label: string;
  }>;
}

export const Navigation: FC<NavigationProps> = ({ items, children }) => {
  const $isNavigationOpen = useStore(isNavigationOpen);

  return (
    <nav
      className={clsx(
        // general
        "h-20 text-lg font-bold items-center",
        // mobile nav
        "max-sm:z-50 max-sm:fixed max-sm:-left-4 max-sm:-right-4 max-sm:-top-4 max-sm:-bottom-4 max-sm:h-screen max-sm:w-screen max-sm:bg-background/95 max-sm:filter max-sm:backdrop-blur-lg max-sm:transition-all",
        // desktop nav
        "md:z-0",
        {
          "max-sm:translate-y-[1920px]": !$isNavigationOpen,
          "max-sm:translate-y-0": $isNavigationOpen,
        },
      )}
      role="navigation"
    >
      <i className="fixed top-6 right-6 sm:hidden sm:invisible">
        <XCircle
          className="w-10 h-10"
          onClick={() => isNavigationOpen.set(false)}
        />
      </i>
      <ul
        className={clsx(
          // general styles
          "flex items-center justify-center h-full",
          // mobile
          "p-4 gap-12 flex-col",
          // desktop styles
          "sm:gap-6 sm:flex-row sm:flex-nowrap sm:h-full sm:p-0",
        )}
      >
        {items.map((item) => (
          <li key={item.href + item.isActive}>
            <a
              className={clsx(
                "transition-colors py-4 px-6 rounded-lg",
                "max-sm:px-12",
                {
                  "bg-foreground text-background cursor-default": item.isActive,
                  "hover:bg-muted": !item.isActive,
                },
              )}
              href={item.href}
            >
              {item.label}
            </a>
          </li>
        ))}
        {children}
      </ul>
    </nav>
  );
};

Navigation.displayName = "Navigation";
