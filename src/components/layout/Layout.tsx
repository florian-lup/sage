import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";

interface LayoutProps {
  children: ReactNode;
  showHomeLink?: boolean;
}

export const Layout = ({ children, showHomeLink = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader showHomeLink={showHomeLink} />
      <main className="flex-1 container py-4">
        {children}
      </main>
      <PageFooter />
    </div>
  );
}; 