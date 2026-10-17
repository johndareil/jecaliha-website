import React from 'react';
import { Share2 } from 'lucide-react';

export default function ShareMenu({ title }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  return (
    <button onClick={handleShare} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
      <Share2 className="h-4 w-4" /> Share
    </button>
  );
}
