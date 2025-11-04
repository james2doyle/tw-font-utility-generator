import React, { useMemo } from 'react';
import { FontStyle } from '../types';
import { TrashIcon } from './icons';

interface FontStyleRowProps {
  style: FontStyle;
  prefix: string;
  onUpdate: (style: FontStyle) => void;
  onDelete: () => void;
}

const inputClasses = "w-full bg-white text-slate-800 p-2 rounded-md border border-slate-400 focus:border-slate-500 focus:ring-slate-500 focus:outline-none transition-colors";
const selectClasses = "w-full bg-white text-slate-800 p-2 rounded-md border border-slate-400 focus:border-slate-500 focus:ring-slate-500 focus:outline-none transition-colors appearance-none";

const FontStyleRow: React.FC<FontStyleRowProps> = ({ style, prefix, onUpdate, onDelete }) => {

  const utilityName = useMemo(() => {
    if (prefix.trim() === '' || style.fontSize <= 0 || style.fontWeight <= 0) {
      return <span className="text-amber-500">Invalid</span>;
    }
    const weightCode = String(style.fontWeight / 10).padStart(2, '0');
    return `type-${prefix}-${style.fontSize}${weightCode}`;
  }, [prefix, style.fontSize, style.fontWeight]);

  const handleChange = <K extends keyof FontStyle,>(key: K, value: FontStyle[K]) => {
    onUpdate({ ...style, [key]: value });
  };
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof FontStyle) => {
    handleChange(key, e.target.value === '' ? 0 : parseFloat(e.target.value));
  };


  return (
    <tr className="bg-white border-b border-slate-300 hover:bg-slate-100">
      <td className="px-4 py-2 font-mono text-slate-700 whitespace-nowrap">
        {utilityName}
      </td>
      <td className="px-4 py-2">
        <input type="number" value={style.fontSize} onChange={(e) => handleNumericChange(e, 'fontSize')} className={inputClasses} />
      </td>
      <td className="px-4 py-2">
        <select value={style.fontStyle} onChange={(e) => handleChange('fontStyle', e.target.value as 'normal' | 'italic')} className={selectClasses}>
          <option value="normal">normal</option>
          <option value="italic">italic</option>
        </select>
      </td>
      <td className="px-4 py-2">
        <input type="number" value={style.lineHeight} onChange={(e) => handleNumericChange(e, 'lineHeight')} className={inputClasses} />
      </td>
      <td className="px-4 py-2">
        <input type="number" step="100" min="100" max="900" value={style.fontWeight} onChange={(e) => handleNumericChange(e, 'fontWeight')} className={inputClasses} />
      </td>
      <td className="px-4 py-2">
        <input type="number" step="0.1" value={style.letterSpacing} onChange={(e) => handleNumericChange(e, 'letterSpacing')} className={inputClasses} />
      </td>
      <td className="px-4 py-2 text-right">
        <button onClick={onDelete} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-red-500 transition-colors" aria-label="Delete style">
          <TrashIcon />
        </button>
      </td>
    </tr>
  );
};

export default FontStyleRow;