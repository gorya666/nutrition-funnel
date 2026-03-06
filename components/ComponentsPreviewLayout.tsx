import { ReactNode } from "react";

type ComponentsPreviewLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function ComponentsPreviewLayout({
  sidebar,
  children,
}: ComponentsPreviewLayoutProps) {
  return (
    <div className="components-preview-layout">
      <aside className="components-sidebar">{sidebar}</aside>
      <main className="components-main-canvas">{children}</main>
    </div>
  );
}
