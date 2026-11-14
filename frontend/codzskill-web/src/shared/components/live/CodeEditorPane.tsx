
import React, { useState } from 'react';
import { Check, Copy, Play } from 'lucide-react';

interface CodeEditorPaneProps {
  code: string;
  onChange: (next: string) => void;
}

export const CodeEditorPane: React.FC<CodeEditorPaneProps> = ({ code, onChange }) => {
  const [copied, setCopied] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleRun = () => {
    setRunOutput(
      'Build succeeded (ASP.NET Core 10) • GET /api/product -> 200 OK (14ms)'
    );
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#14182B] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1A2036] px-4 py-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono font-medium text-violet-300">
            ProductController.cs
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2.5 py-1 hover:bg-white/10"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleRun}
            className="inline-flex items-center gap-1 rounded-md bg-violet-600 px-2.5 py-1 font-semibold text-white hover:bg-violet-500"
          >
            <Play className="h-3 w-3" /> Run
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-auto p-4 font-mono text-xs sm:text-[13px] leading-6">
        <div className="select-none pr-4 text-right text-slate-500">
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 resize-none bg-transparent text-sky-100 focus:outline-none"
        />
      </div>

      {runOutput && (
        <div className="border-t border-white/10 bg-emerald-950/50 px-4 py-2 font-mono text-xs text-emerald-300">
          &gt; {runOutput}
        </div>
      )}
    </div>
  );
};
