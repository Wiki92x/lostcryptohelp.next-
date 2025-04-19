// ✅ components/ScanJsonViewer.tsx — Full JSON Viewer for DeepTrace Results
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ScanJsonViewer({ data }: { data: any }) {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `deeptrace-result-${data.wallet}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 mt-6 border border-zinc-700">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-white">🔎 Full JSON Report</h3>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide JSON' : 'View JSON'}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleDownload}>
            Download JSON
          </Button>
        </div>
      </div>

      {expanded && (
        <pre className="bg-zinc-800 p-3 rounded-lg overflow-auto text-xs text-green-200 max-h-96 whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
