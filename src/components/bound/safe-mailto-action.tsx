import type { FC } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SafeMailtoActionProps {
  encodedUrl: string;
  label: string;
}

export const SafeMailtoAction: FC<SafeMailtoActionProps> = ({
  encodedUrl,
  label,
}) => (
  <Button
    data-umami-event={label}
    onClick={(ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      window.open(atob(encodedUrl));
    }}
  >
    {label}
    <Send className="ml-2 w-4 h-4" />
  </Button>
);
