import { ReactNode } from "react";

type LayoutContainerProps = {
  children: ReactNode;
};

export default function LayoutContainer({ children }: LayoutContainerProps) {
  return <div className="layout-container">{children}</div>;
}
