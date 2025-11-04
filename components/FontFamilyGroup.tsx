import React, { useCallback } from 'react';
import { FontFamily, FontStyle } from '../types';
import FontStyleRow from './FontStyleRow';
import { PlusIcon, TrashIcon } from './icons';

interface FontFamilyGroupProps {
  family: FontFamily;
  onUpdateFamily: (family: FontFamily) => void;
  onDeleteFamily: (familyId: string) => void;
}

const FontFamilyGroup: React.FC<FontFamilyGroupProps> = ({ family, onUpdateFamily, onDeleteFamily }) => {
  
  const handlePrefixChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateFamily({ ...family, prefix: e.target.value });
  }, [family, onUpdateFamily]);

  const handleAddStyle = useCallback(() => {
    const newStyle: FontStyle = {
      id: crypto.randomUUID(),
      fontSize: 16,
      fontStyle: 'normal',
      lineHeight: 24,
      fontWeight: 400,
      letterSpacing: 0,
    };
    onUpdateFamily({ ...family, styles: [...family.styles, newStyle] });
  }, [family, onUpdateFamily]);

  const handleUpdateStyle = useCallback((updatedStyle: FontStyle) => {
    const updatedStyles = family.styles.map(style => style.id === updatedStyle.id ? updatedStyle : style);
    onUpdateFamily({ ...family, styles: updatedStyles });
  }, [family, onUpdateFamily]);

  const handleDeleteStyle = useCallback((styleId: string) => {
    const updatedStyles = family.styles.filter(style => style.id !== styleId);
    onUpdateFamily({ ...family, styles: updatedStyles });
  }, [family, onUpdateFamily]);

  return (
    <div className="bg-white border border-slate-300 rounded-xl shadow-lg">
      <div className="p-4 flex justify-between items-center border-b border-slate-300">
        <div className="flex items-center gap-2">
            <label htmlFor={`prefix-${family.id}`} className="text-slate-500 font-medium text-sm">Prefix:</label>
            <input
                id={`prefix-${family.id}`}
                type="text"
                value={family.prefix}
                onChange={handlePrefixChange}
                className="bg-white text-lg font-bold text-slate-800 p-1 rounded-md border border-slate-400 focus:border-slate-500 focus:ring-slate-500 focus:outline-none"
                placeholder="e.g. heading"
            />
        </div>
        <button 
          onClick={() => onDeleteFamily(family.id)}
          className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-colors"
          aria-label="Delete font family"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-4 py-3">Utility Name</th>
              <th scope="col" className="px-4 py-3 w-24">Size (px)</th>
              <th scope="col" className="px-4 py-3 w-32">Style</th>
              <th scope="col" className="px-4 py-3 w-24">Line-H (px)</th>
              <th scope="col" className="px-4 py-3">Weight</th>
              <th scope="col" className="px-4 py-3">Letter-S (px)</th>
              <th scope="col" className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {family.styles.map(style => (
              <FontStyleRow
                key={style.id}
                style={style}
                prefix={family.prefix}
                onUpdate={handleUpdateStyle}
                onDelete={() => handleDeleteStyle(style.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
       <div className="p-2 border-t border-slate-300">
            <button 
                onClick={handleAddStyle}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm rounded-md text-slate-700 hover:bg-slate-200 font-medium transition-colors"
            >
                <PlusIcon />
                Add Style
            </button>
       </div>
    </div>
  );
};

export default FontFamilyGroup;