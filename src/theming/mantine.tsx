import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { useLocalStorage } from "@mantine/hooks";
import { ReactNode } from "react";

import Fonts from "theming/fonts";
import { colorBrandDark, colorBrandPrimary } from "theming";

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return { colorScheme, setColorScheme, toggleColorScheme };
};

interface MantineProviderProps {
  children: ReactNode;
}

export const MyMantineProvider = ({ children }: MantineProviderProps) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
            fontFamily: "Open Sans",
            colors: {
              brand: colorBrandPrimary,
              dark: colorBrandDark,
            },
            primaryColor: "brand",
            components: {
              Tooltip: {
                styles: {
                  tooltip: {
                    marginTop: 5,
                    fontSize: 12,
                  },
                },
              },
            },
          }}
        >
          <ModalsProvider>
            <NotificationsProvider>
              <Fonts />
              {children}
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};
