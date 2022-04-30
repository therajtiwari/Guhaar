import { makeStyles } from "@mui/styles";
import React from "react";

const layoutStyle = {
  minHeight: "100vh",
  width: "90%",
  margin: "auto",
};

export default function Layout({ children }) {
  return <div style={{ ...layoutStyle }}>{children}</div>;
}
