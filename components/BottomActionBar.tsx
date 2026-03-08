"use client";

import { ReactNode } from "react";

type BottomActionBarProps = {
  children: ReactNode;
};

export default function BottomActionBar({ children }: BottomActionBarProps) {
  return (
    <footer className="bottom-action-bar">
      <div className="bottom-action-bar-inner">{children}</div>
    </footer>
  );
}
