// 1. Import the extendTheme function
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF4500",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
  },
});
