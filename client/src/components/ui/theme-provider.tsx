import { ThemeProvider as ThemeProviderHook } from "@/hooks/use-theme";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light" | "system";
  storageKey?: string;
}

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "sweetcoin-theme" }: ThemeProviderProps) {
  return (
    <ThemeProviderHook defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProviderHook>
  );
}
