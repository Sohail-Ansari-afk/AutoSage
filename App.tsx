import React, { useState, useCallback } from 'react';
import { getVehicleInfo, generateVehicleImages, Source } from './services/geminiService';
import { SCENARIO_EXAMPLES } from './constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResponseDisplay from './components/ResponseDisplay';
import ScenarioCard from './components/ScenarioCard';

export interface SearchResult {
  text: string;
  sources: Source[];
  images: string[];
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setIsLoading(true);
    setResponse(null);
    setError(null);
    setHasSearched(true);

    try {
      // Fetch text with sources and images in parallel
      const [infoResult, imageResult] = await Promise.all([
        getVehicleInfo(searchQuery),
        generateVehicleImages(searchQuery)
      ]);

      setResponse({
        text: infoResult.text,
        sources: infoResult.sources,
        images: imageResult,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleScenarioClick = (prompt: string) => {
    handleSearch(prompt);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <Header />

      <main className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md pt-4 pb-6">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} initialQuery={query} />
        </div>

        <div className="mt-6">
          {!hasSearched && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to AutoSage</h2>
              <p className="text-slate-400 mb-8">Your AI-powered vehicle expert. Choose an example below or ask me anything.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SCENARIO_EXAMPLES.map((scenario) => (
                  <ScenarioCard
                    key={scenario.title}
                    title={scenario.title}
                    description={scenario.description}
                    onClick={() => handleScenarioClick(scenario.prompt)}
                  />
                ))}
              </div>
            </div>
          )}

          {hasSearched && (
            <ResponseDisplay 
              query={query}
              response={response} 
              isLoading={isLoading} 
              error={error} 
            />
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Gemini Flash. For informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;