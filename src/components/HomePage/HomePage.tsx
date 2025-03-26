import { RiCpuLine } from "react-icons/ri";
import SearchForm from "./SearchForm";
import { HomePageProps } from "../../types/components";

export const HomePage = ({ onSearch, loading }: HomePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-4 sm:mb-5 lg:mb-6 w-full max-w-2xl">
        <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4">
          <div className="flex items-center px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5">
            <RiCpuLine className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-4.5 lg:w-4.5 text-[var(--green-400)] mr-1 sm:mr-1.5" />
            <p className="text-[10px] sm:text-xs lg:text-sm text-[var(--foreground)]">Powered by AI</p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 sm:mb-3 lg:mb-4 leading-tight">
          Conversational <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-primary)' }}>web research</span>
        </h2>
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