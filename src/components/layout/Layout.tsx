import { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";

interface LayoutProps {
  children: ReactNode;
  showHomeLink?: boolean;
}

export const Layout = ({ children, showHomeLink = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ 
      backgroundImage: 'var(--grid-pattern)',
      backgroundSize: 'var(--grid-size)'
    }}>
      {/* Edge fading overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 50%, var(--background) 100%)',
          zIndex: 1
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <PageHeader showHomeLink={showHomeLink} />
        <main className="flex-1 container py-4">
          {children}
        </main>
        <PageFooter />
      </div>
    </div>
  );
}; 