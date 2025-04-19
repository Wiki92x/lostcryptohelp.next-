'use client';

import * as React from 'react';

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

export function AccordionItem({ children }: { children: React.ReactNode }) {
  return <div className="border border-zinc-700 rounded-xl">{children}</div>;
}

export function AccordionTrigger({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      className="w-full text-left px-4 py-3 font-medium bg-zinc-800 rounded-t-xl"
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-3 bg-zinc-900 rounded-b-xl text-sm">{children}</div>;
}