import React from "react";
import { ThemeProvider } from "styled-components";
import { getDefaultTheme } from "@elliemae/pui-theme";
import { SelectMultiple } from "./components/SelectMultiple";
import "react-dates/lib/css/_datepicker.css"
// this is built on deploy and is subject to changes
// don't rely on this file in your application.
import './App.scss'

const theme = getDefaultTheme();

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SelectMultiple />
      </ThemeProvider>
    </div>
  );
}
