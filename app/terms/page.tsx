// app/terms/page.tsx
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-crystalText">
      <h1 className="text-4xl font-bold text-purple-400 mb-6">Terms of Service</h1>

      <p className="mb-6">
        By accessing or using LostCryptoHelp.pro, you agree to be legally bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our service.
      </p>

      <ul className="space-y-4 text-sm leading-relaxed">
        <li>
          <strong>No Financial Advice:</strong> All information provided on LostCryptoHelp is for informational and forensic purposes only. We do not provide investment, financial, or legal advice.
        </li>

        <li>
          <strong>No Wallet Access or Storage:</strong> We do not request, store, or access your private keys, seed phrases, or login credentials. All scans are conducted via public blockchain APIs using read-only endpoints.
        </li>

        <li>
          <strong>Privacy Disclaimer:</strong> We do not collect personally identifiable information. Any user-submitted content is processed securely and purged after fulfillment.
        </li>

        <li>
          <strong>Scan Accuracy & Liability:</strong> While we strive to deliver accurate results, blockchain data may change rapidly. We are not liable for decisions made based on the results of our analysis. Use this tool at your own risk.
        </li>

        <li>
          <strong>Payment Terms:</strong> TRON scans are free. ETH and BSC scans require upfront, pay-per-use micro-payments. All payments are final and non-refundable.
        </li>

        <li>
          <strong>Third-Party Data:</strong> LostCryptoHelp uses APIs from GoPlus Labs, Etherscan, BscScan, TronScan, and Telegram. We do not control these providers and are not responsible for their uptime or data availability.
        </li>

        <li>
          <strong>Prohibited Use:</strong> You agree not to misuse this service for fraudulent, malicious, or unauthorized purposes, including phishing, scraping, or bypassing smart contract limits.
        </li>

        <li>
          <strong>AI Risk Disclaimer:</strong> Some analysis is generated using artificial intelligence and may contain predictive or interpretative content. It may not reflect actual blockchain activity with full precision.
        </li>

        <li>
          <strong>Non-KYC Platform:</strong> We do not require or verify your identity (KYC). By using this site, you confirm that you are not in a restricted jurisdiction and are solely responsible for complying with your local regulations.
        </li>

        <li>
          <strong>Intellectual Property:</strong> All branding, UI design, code, copy, and generated reports are owned by LostCryptoHelp. You may not copy, reproduce, or redistribute our intellectual property without permission.
        </li>

        <li>
          <strong>Jurisdiction & Arbitration:</strong> This service is offered globally and governed by applicable international digital laws. Any dispute arising from your use of LostCryptoHelp shall be resolved via confidential binding arbitration, unless prohibited by law.
        </li>

        <li>
          <strong>Modifications:</strong> We reserve the right to update these terms at any time. Continued use of this site constitutes agreement with the updated terms.
        </li>
      </ul>

      <p className="text-xs text-gray-500 mt-6">Last updated: 4/14/2025</p>
    </div>
  );
}
