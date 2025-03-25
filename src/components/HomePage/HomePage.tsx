import { RiRobot2Line, RiTranslate2 } from "react-icons/ri";
import { BsLightningCharge } from "react-icons/bs";
import SearchForm from "./SearchForm";

interface HomePageProps {
  onSearch: (searchQuery: string, includeDomains?: string[]) => Promise<void>;
  loading: boolean;
}

export const HomePage = ({ onSearch, loading }: HomePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-10 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
          Intelligent answers <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-primary)' }}>in English</span>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <div className="flex items-center">
            <div className="bg-[var(--secondary)] p-2 rounded-full mr-3">
              <RiTranslate2 className="h-5 w-5 text-[var(--blue-600)]" />
            </div>
            <p className="text-sm text-[var(--foreground)]">English content</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-[var(--secondary)] p-2 rounded-full mr-3">
              <BsLightningCharge className="h-5 w-5 text-[var(--green-400)]" />
            </div>
            <p className="text-sm text-[var(--foreground)]">Fast and concise answers</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-[var(--secondary)] p-2 rounded-full mr-3">
              <RiRobot2Line className="h-5 w-5 text-[var(--blue-600)]" />
            </div>
            <p className="text-sm text-[var(--foreground)]">Powered by AI</p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-2xl">
        <SearchForm 
          onSearch={onSearch} 
          disabled={loading}
        />
      </div>
    </div>
  );
}; 