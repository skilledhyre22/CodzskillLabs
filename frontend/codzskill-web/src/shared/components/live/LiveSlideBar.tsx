
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { cn } from '../../utilis/formatters';

interface LiveSidebarProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  participantCount: number;
}

export const LiveSidebar: React.FC<LiveSidebarProps> = ({
  messages,
  onSendMessage,
  participantCount,
}) => {
  const [tab, setTab] = useState<'Chat' | 'Q&A' | 'People'>('Chat');
  const [input, setInput] = useState('');

  const participants = [
    'Rahul Verma (Trainer)',
    'Priya Sharma',
    'Amit Patel',
    'Sneha Reddy',
    'Karan Malhotra',
    'Ananya Nair',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#1B2034] text-white overflow-hidden">
      {/* Tabs */}
      <div className="grid grid-cols-3 border-b border-white/10 text-xs font-semibold">
        {(['Chat', 'Q&A', 'People'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'py-3 transition-colors',
              tab === t
                ? 'border-b-2 border-violet-500 text-white bg-white/5'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {t === 'People' ? `People (${participantCount})` : t}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      {tab === 'Chat' && (
        <>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      'font-semibold',
                      msg.role === 'Trainer' ? 'text-violet-300' : 'text-slate-200'
                    )}
                  >
                    {msg.sender}
                  </span>
                  <span className="text-[11px] text-slate-500">{msg.time}</span>
                </div>
                <p className="rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-200 leading-relaxed">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-white/10 bg-[#121628] px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-500"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </>
      )}

      {tab === 'Q&A' && (
        <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="font-semibold text-violet-300">Q: Should we use Minimal APIs or Controllers?</p>
            <p className="mt-1 text-slate-300">
              Answered by Trainer: Both work great in ASP.NET Core 10. Controllers organize large enterprise teams well, while Minimal APIs shine in microservices.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="font-semibold text-violet-300">Q: Where is the starter GitHub repo?</p>
            <p className="mt-1 text-slate-300">
              Pinned in Cohort Resources &rarr; Week 3 Lab.
            </p>
          </div>
        </div>
      )}

      {tab === 'People' && (
        <div className="flex-1 space-y-2 overflow-y-auto p-4 text-xs">
          {participants.map((person) => (
            <div
              key={person}
              className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
            >
              <span>{person}</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
