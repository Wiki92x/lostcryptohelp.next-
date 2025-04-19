import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Download, Send } from 'lucide-react';

export default function DeepTraceReport() {
  const mockData = {
    wallet: '0x3f16d51FDeF8E5Ae86D7E34602B6A4056A35e6D8',
    chain: 'bsc',
    riskScore: 5,
    findings: [
      {
        title: 'Gas Overpayment Detected',
        severity: 'low',
        recommendation: 'Claim refund via LayerZero portal',
      },
      {
        title: 'Unlimited Token Approvals',
        severity: 'medium',
        recommendation: 'Use Revoke tool to limit risk exposure',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-muted/40 border border-border shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="text-xl font-semibold flex items-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" /> Risk Score: {mockData.riskScore}/100
          </div>

          <div className="space-y-4">
            {mockData.findings.map((finding, i) => (
              <div
                key={i}
                className="border-l-4 pl-4 py-2 bg-background border-yellow-400 rounded-md shadow-sm"
              >
                <p className="text-sm font-bold text-yellow-600">⚠ {finding.title}</p>
                <p className="text-sm text-muted-foreground">Severity: {finding.severity}</p>
                <p className="text-sm text-primary">{finding.recommendation}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" /> Send to Telegram
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
