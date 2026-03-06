import { HTMLAttributes, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export default function Card({ children, className = "", ...props }: CardProps) {
  const resolvedClassName = className ? `card ${className}` : "card";

  return (
    <section className={resolvedClassName} {...props}>
      {children}
    </section>
  );
}
