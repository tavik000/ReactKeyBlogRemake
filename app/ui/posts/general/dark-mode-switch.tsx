import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/20/solid";
import { useSessionContext } from "@/app/components/context/session-provider";
import { setUserTheme } from "@/app/lib/actions";
import { useCallback, useState } from "react";
import { set } from "zod";
import { useTheme } from "next-themes";

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function DarkModeSwitch() {
  const { setTheme } = useTheme();
  const { session, localUser } = useSessionContext();
  const [isChecked, setIsChecked] = useState(localUser?.theme === "dark");

  setTheme(isChecked ? "dark" : "light");

  const debouncedSetUserTheme = useCallback(
    debounce((userId: string, theme: string) => {
      setUserTheme(userId, theme);
    }, 1000),
    [],
  );

  const onCheckedChange = (isChecked: boolean) => {
    if (localUser) {
      setIsChecked(isChecked);
      const themeValue = isChecked ? "dark" : "light";
      console.log("themeValue ", themeValue);
      setTheme(themeValue);
      localUser.theme = themeValue;
      if (session?.user) {
        debouncedSetUserTheme(localUser.id, localUser.theme);
      }
    }
  };

  return (
    <Label
      id="dark-mode-switch"
      className="flex cursor-pointer items-center justify-center space-x-2"
    >
      <SunIcon
        className={`flex h-6 w-6 ${!isChecked ? "text-black" : "text-gray-300"}`}
      />
      <Switch
        id="dark-mode-switch"
        className="flex"
        defaultChecked={localUser?.theme === "dark"}
        onCheckedChange={onCheckedChange}
      />
      <MoonIcon
        className={`flex h-6 w-6 ${isChecked ? "text-black" : "text-gray-300"}`}
      />
    </Label>
  );
}
