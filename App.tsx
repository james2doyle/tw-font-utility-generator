import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FontFamily } from './types';
import { INITIAL_FONT_FAMILIES } from './constants';
import FontFamilyGroup from './components/FontFamilyGroup';
import OutputPanel from './components/OutputPanel';
import { PlusIcon } from './components/icons';

const getInitialState = (): FontFamily[] => {
  try {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decodedString = atob(hash);
      const parsedState = JSON.parse(decodedString);
      if (Array.isArray(parsedState) && parsedState.every(item => 'id' in item && 'prefix' in item && 'styles' in item)) {
        return parsedState;
      }
    }
  } catch (error) {
    console.error("Failed to parse state from URL hash, falling back to default.", error);
  }
  return INITIAL_FONT_FAMILIES;
};


const App: React.FC = () => {
  const [fontFamilies, setFontFamilies] = useState<FontFamily[]>(getInitialState);

  useEffect(() => {
    try {
      const stateString = JSON.stringify(fontFamilies);
      const encodedState = btoa(stateString);
      // Use location.hash directly as it's more compatible with sandboxed environments
      // than history.replaceState.
      if (window.location.hash !== `#${encodedState}`) {
        window.location.hash = encodedState;
      }
    } catch (error) {
      console.error("Failed to update URL with state:", error);
    }
  }, [fontFamilies]);

  const handleAddFamily = useCallback(() => {
    const newFamily: FontFamily = {
      id: crypto.randomUUID(),
      prefix: `new-family-${fontFamilies.length + 1}`,
      styles: [
        { id: crypto.randomUUID(), fontSize: 16, fontStyle: 'normal', lineHeight: 24, fontWeight: 400, letterSpacing: 0 },
      ],
    };
    setFontFamilies(prev => [...prev, newFamily]);
  }, [fontFamilies.length]);

  const handleUpdateFamily = useCallback((updatedFamily: FontFamily) => {
    setFontFamilies(prev => prev.map(family => family.id === updatedFamily.id ? updatedFamily : family));
  }, []);

  const handleDeleteFamily = useCallback((familyId: string) => {
    setFontFamilies(prev => prev.filter(family => family.id !== familyId));
  }, []);

  const generatedCss = useMemo(() => {
    let cssString = `/* Define your font families as CSS variables in your main CSS file */\n`;
    cssString += `:root {\n`;
    const uniquePrefixes = [...new Set(fontFamilies.map(f => f.prefix))];
    uniquePrefixes.forEach(prefix => {
      cssString += `  --font-${prefix}: "Your Font Name", sans-serif;\n`;
    });
    cssString += `}\n\n`;
  
    fontFamilies.forEach(family => {
      if(family.prefix.trim() === '') return;
      family.styles.forEach(style => {
        if (style.fontSize <= 0 || style.fontWeight <= 0) return;
        const utilityName = `type-${family.prefix}-${style.fontSize}${String(style.fontWeight / 10).padStart(2, '0')}`;
        cssString += `@utility ${utilityName} {\n`;
        cssString += `  font: ${style.fontStyle} normal ${style.fontWeight} ${style.fontSize / 16}rem/${style.lineHeight / 16}rem var(--font-${family.prefix});\n`;
        cssString += `  letter-spacing: ${style.letterSpacing}px;\n`;
        cssString += `}\n\n`;
      });
    });
    return cssString.trim();
  }, [fontFamilies]);
  

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <header className="py-6 px-4 md:px-8 border-b border-slate-300">
        <h1 className="text-3xl font-bold text-slate-900">Tailwind v4 Font Utility Generator</h1>
        <p className="text-slate-600 mt-1">Create and export custom type utilities for your design system.</p>
      </header>

      <main className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="flex flex-col gap-8 lg:col-span-3">
          {fontFamilies.map(family => (
            <FontFamilyGroup
              key={family.id}
              family={family}
              onUpdateFamily={handleUpdateFamily}
              onDeleteFamily={handleDeleteFamily}
            />
          ))}
          <button
            onClick={handleAddFamily}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-200 hover:bg-slate-300/50 border-2 border-dashed border-slate-400 rounded-lg text-slate-700 font-semibold transition-colors duration-200"
          >
            <PlusIcon />
            Add Font Family
          </button>
        </div>

        <div className="lg:sticky top-8 lg:col-span-2 h-full">
          <OutputPanel cssCode={generatedCss} />
        </div>
      </main>
    </div>
  );
};

export default App;