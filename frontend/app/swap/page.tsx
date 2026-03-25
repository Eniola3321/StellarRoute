"use client";

import React from "react";
import { TokenPairSelector } from "@/components/swap/TokenPairSelector";
import { usePairs } from "@/hooks/useApi";
import { useTokenPairUrl } from "@/hooks/useTokenPairUrl";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SwapPage() {
  const { data: pairsData, loading: pairsLoading, error: pairsError } = usePairs();
  const { base, quote, setPair, isInitializing } = useTokenPairUrl();

  const pairs = pairsData || [];

  if (pairsLoading || isInitializing) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Token Swap</h1>
        <Card className="p-4">
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Token Swap</h1>
      <p className="text-muted-foreground mb-6">
        Select a trading pair to get started with your swap
      </p>

      <TokenPairSelector
        pairs={pairs}
        selectedBase={base}
        selectedQuote={quote}
        onPairChange={setPair}
        loading={pairsLoading}
        error={
          pairsError
            ? "Failed to load trading pairs. Please check your API connection."
            : undefined
        }
      />

      {base && quote && (
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold mb-4">Selected Pair</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Asset:</span>
              <span className="font-mono">{base}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quote Asset:</span>
              <span className="font-mono">{quote}</span>
            </div>
          </div>
        </Card>
      )}

      {pairs.length === 0 && !pairsLoading && !pairsError && (
        <Card className="mt-6 p-6 text-center">
          <p className="text-muted-foreground">
            No trading pairs available. Please ensure the API is running and has indexed some pairs.
          </p>
        </Card>
      )}
    </div>
  );
}
