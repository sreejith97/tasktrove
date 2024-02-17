import React from "react";
import Header from "../common/Header";

export default function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
