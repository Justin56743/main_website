"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PredictionResult {
  cluster: number;
  traits: string;
  details?: string;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [rawDetails, setRawDetails] = useState<any>(null);

  useEffect(() => {
    const cluster = searchParams.get('cluster');
    const traits = searchParams.get('traits');
    const details = searchParams.get('details');

    if (cluster && traits) {
      setResult({
        cluster: parseInt(cluster, 10),
        traits: decodeURIComponent(traits),
      });
      
      if (details) {
        try {
          setRawDetails(JSON.parse(decodeURIComponent(details)));
        } catch (e) {
          console.error('Error parsing details:', e);
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="dashboard-container">
      {result ? (
        <div className="result-card">
          <h2>Personality Cluster: {result.cluster}</h2>
          <p className="traits">{result.traits}</p>
          
          {rawDetails && (
            <div className="debug-info">
              <h3>Technical Details</h3>
              <pre>{JSON.stringify(rawDetails, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <div className="no-results">
          <p>No results found. Please complete the questionnaire first.</p>
        </div>
      )}
    </div>
  );
}