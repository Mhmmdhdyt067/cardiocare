import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TechStackSection } from './components/TechStackSection';
import { PipelineSection } from './components/PipelineSection';
import { EdaSection } from './components/EdaSection';
import { ModelComparisonSection } from './components/ModelComparisonSection';
import { PredictorSection } from './components/PredictorSection';
import { FaqDefenseSection } from './components/FaqDefenseSection';
import { Footer } from './components/Footer';

export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-rose-500 selection:text-white">
            <Navbar />
            <main className="flex-1">
                <HeroSection />
                <TechStackSection />
                <PipelineSection />
                <EdaSection />
                <ModelComparisonSection />
                <PredictorSection />
                <FaqDefenseSection />
            </main>
            <Footer />
        </div>
    );
}

// Mount the React app to the DOM
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
