import React, { useState, useCallback } from 'react';

interface OutputPanelProps {
  cssCode: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ cssCode }) => {
  const [copyStatus, setCopyStatus] = useState('Copy');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }, () => {
      setCopyStatus('Failed!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    });
  }, [cssCode]);

  return (
    <div className="bg-white border border-slate-300 rounded-xl shadow-lg h-full flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-slate-300">
        <h2 className="text-lg font-semibold text-slate-900">Generated CSS</h2>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            copyStatus === 'Copied!' 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
          }`}
        >
          {copyStatus}
        </button>
      </div>
      <div className="p-4 flex-grow min-h-0">
        <pre className="text-sm bg-slate-100 p-4 rounded-lg overflow-auto h-full text-slate-600">
          <code>
            {cssCode}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default OutputPanel;