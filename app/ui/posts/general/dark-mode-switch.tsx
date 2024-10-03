import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/20/solid";

export function DarkModeSwitch() {
  return (
    <Label id="dark-mode-switch" className="flex items-center justify-center space-x-2 cursor-pointer">
      <SunIcon className="flex h-6 w-6 text-gray-500" />
      <Switch id="dark-mode-switch" className="flex" />
      <MoonIcon className="flex h-6 w-6 text-gray-500" />
    </Label>
  );
}
