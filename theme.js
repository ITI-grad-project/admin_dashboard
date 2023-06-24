import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
export const tokens = (mode) => ({
  ...createContext(
    mode === "dark"
      ? {
          yellow: {
            100: "#fcf4e2",
            200: "#fae9c5",
            300: "#f7dda8",
            400: "#f5d28b",
            500: "#f2c76e",
            600: "#c29f58",
            700: "#917742",
            800: "#61502c",
            900: "#302816",
          },
          black: {
            100: "#d3d3d3",
            200: "#a8a8a8",
            300: "#7c7c7c",
            400: "#515151",
            500: "#252525",
            600: "#1e1e1e",
            700: "#161616",
            800: "#0f0f0f",
            900: "#070707",
          },
          white: {
            100: "#fffefd",
            200: "#fffcfb",
            300: "#fffbf8",
            400: "#fff9f6",
            500: "#fff8f4",
            600: "#ccc6c3",
            700: "#999592",
            800: "#666362",
            900: "#333231",
          },
          indigo: {
            100: "#d8dadc",
            200: "#b1b4b9",
            300: "#8b8f97",
            400: "#646974",
            500: "#3d4451",
            600: "#313641",
            700: "#252931",
            800: "#181b20",
            900: "#0c0e10",
          },
          indigo: {
            100: "#dbdbdb",
            200: "#b7b7b7",
            300: "#929292",
            400: "#6e6e6e",
            500: "#4a4a4a",
            600: "#3b3b3b",
            700: "#2c2c2c",
            800: "#1e1e1e",
            900: "#0f0f0f",
          },
        }
      : {
          yellow: {
            100: "#302816",
            200: "#61502c",
            300: "#917742",
            400: "#c29f58",
            500: "#f2c76e",
            600: "#f5d28b",
            700: "#f7dda8",
            800: "#fae9c5",
            900: "#fcf4e2",
          },
          black: {
            100: "#070707",
            200: "#0f0f0f",
            300: "#161616",
            400: "#1e1e1e",
            500: "#252525",
            600: "#515151",
            700: "#7c7c7c",
            800: "#a8a8a8",
            900: "#d3d3d3",
          },
          white: {
            100: "#333231",
            200: "#666362",
            300: "#999592",
            400: "#ccc6c3",
            500: "#fff8f4",
            600: "#fff9f6",
            700: "#fffbf8",
            800: "#fffcfb",
            900: "#fffefd",
          },
          indigo: {
            100: "#0c0e10",
            200: "#181b20",
            300: "#252931",
            400: "#313641",
            500: "#3d4451",
            600: "#646974",
            700: "#8b8f97",
            800: "#b1b4b9",
            900: "#d8dadc",
          },
          indigo: {
            100: "#0f0f0f",
            200: "#1e1e1e",
            300: "#2c2c2c",
            400: "#3b3b3b",
            500: "#4a4a4a",
            600: "#6e6e6e",
            700: "#929292",
            800: "#b7b7b7",
            900: "#dbdbdb",
          },
        }
  ),
});

///
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    pallette: mode,
    ...(mode === "dark"
      ? {
          primary: {
            main: colors.yellow[500],
          },
          secondary: {
            main: colors.indigo[500],
          },
          neutral: {
            dark: colors.black[700],
            main: colors.black[500],
            light: colors.black[100],
          },
          background: {
            default: colors.yellow[100],
          },
        }
      : {
          primary: {
            main: colors.yellow[100],
          },
          secondary: {
            main: colors.indigo[500],
          },
          neutral: {
            dark: colors.black[700],
            main: colors.black[500],
            light: colors.black[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
  };
};
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [model]);
};
