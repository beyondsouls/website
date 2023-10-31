import { isNavigationOpen } from "@/stores/navigation";
import { Menu } from "lucide-react";
import { useStore } from "@nanostores/react";

import { Button } from "@/components/ui/button";

export const MobileToggle = () => {
  const $isNavigationOpen = useStore(isNavigationOpen);

  function handleToggle() {
    isNavigationOpen.set(!$isNavigationOpen);
  }

  return (
    <Button
      variant="ghost"
      onClick={handleToggle}
      className="md:invisible sm:hidden"
    >
      <Menu className="w-8 h-8" />
    </Button>
  );
};
