'use client';

import { useEffect, useState, useCallback, useMemo } from "react";
import { ShieldAlert, Link2, Info, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThreatChartPanel from '@/components/threat-hub/ThreatChartPanel';
import DOMPurify from "dompurify";
import React from "react";
import Link from 'next/link';
import { usePremiumUser } from '@/hooks/usePremiumUser';

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-red-500 pt-24">
          Something went wrong. Try refreshing the page.
        </div>
      );
    }
    return this.props.children;
  }
}

type Threat = {
  id: string;
  title: string;
  riskLevel: "low" | "medium" | "high";
  source: string;
  tags: string[];
  date: string;
  url: string;
  type?: string;
};

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "/api/threat-feed";
const MAX_RETRIES = 3;
const retryDelay = (retryCount: number) => Math.pow(2, retryCount) * 1000;

export default function ThreatHubPage() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const { isPremium } = usePremiumUser();

  const fetchThreats = useCallback(async (retryCount = 0) => {
    const controller = new AbortController();
    try {
      const response = await fetch(API_ENDPOINT, {
        signal: controller.signal,
        headers: { "access_token": process.env.NEXT_PUBLIC_API_KEY || "secure1234567apikey" },
      });
      const data = await response.json();
      setThreats(data?.data || []);
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => fetchThreats(retryCount + 1), retryDelay(retryCount));
      } else {
        console.error("Max retries reached.", error);
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isPremium) fetchThreats();
  }, [isPremium, fetchThreats]);

  const getColor = useCallback((level: string) => {
    if (level === "high") return "bg-red-600";
    if (level === "medium") return "bg-yellow-400 text-black";
    return "bg-green-600";
  }, []);

  const threatElements = useMemo(
    () =>
      threats.map((threat, i) => (
        <div
          key={threat.id}
          className="bg-muted border border-border rounded-xl p-5 shadow hover:border-blue-500 transition"
        >
          <div className="flex items-center gap-2 text-sm font-semibold mb-3">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-blue-500">{threat.title}</span>
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            Source: <span className="text-foreground font-medium">{threat.source}</span>
            <br />
            Date: {new Date(threat.date).toLocaleString()}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {threat.tags.map((tag, j) => (
              <span
                key={`${threat.id}-${j}`}
                className="text-xs bg-muted-foreground/10 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getColor(
                threat.riskLevel
              )}`}
            >
              {threat.riskLevel.toUpperCase()}
            </span>
            <a
              href={DOMPurify.sanitize(threat.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs flex items-center gap-1 hover:underline"
            >
              <Link2 className="w-3 h-3" /> View
            </a>
          </div>
        </div>
      )),
    [threats, getColor]
  );

  return (
    <ErrorBoundary>
      <main className="min-h-screen px-6 py-20 bg-background text-foreground">
        <div className="max-w-5xl mx-auto space-y-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-500 flex justify-center items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-red-500" /> AI-Powered Threat Intel Hub
          </h1>
          <p className="text-muted-foreground text-center max-w-xl mx-auto text-sm">
            Live threat feed of scams, phishing contracts, fake airdrops, and malicious token exploits — classified by AI.
          </p>

          {!isPremium ? (
            <div className="text-center space-y-4 pt-12">
              <p className="text-muted-foreground">Upgrade to Pro to access classified threat intel.</p>
              <Link href="/pricing">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Lock className="w-4 h-4 mr-2" /> View Premium Plans
                </Button>
              </Link>
            </div>
          ) : loading ? (
            <div className="flex justify-center pt-24">
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            </div>
          ) : threats.length === 0 ? (
            <div className="text-center text-muted-foreground pt-16">
              <Info className="mx-auto w-6 h-6 mb-2" />
              No threats detected. Try again later.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {threatElements}
              </div>
              <div className="pt-10">
                <ThreatChartPanel threats={threats} />
              </div>
            </>
          )}
        </div>
      </main>
    </ErrorBoundary>
  );
}