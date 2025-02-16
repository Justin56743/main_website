"use client";

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { Brain, BarChartIcon as ChartBar, Compass, Focus, LightbulbIcon, Target } from "lucide-react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const personalityTraits = [
  {
    icon: Target,
    title: "Strategic Vision",
    description: "You excel at developing long-term strategies and seeing the bigger picture in complex situations.",
  },
  {
    icon: ChartBar,
    title: "Data-Driven Decision Making",
    description: "You rely on facts, data, and logical analysis to make informed decisions.",
  },
  {
    icon: Focus,
    title: "Strong Leadership",
    description: "You naturally take charge and guide others towards achieving collective goals.",
  },
  {
    icon: Compass,
    title: "Objective Analysis",
    description: "You approach problems with a clear, unbiased perspective and systematic thinking.",
  },
  {
    icon: LightbulbIcon,
    title: "Innovation Through Analysis",
    description: "You combine analytical thinking with creative problem-solving to drive innovation.",
  },
]

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
        <div className="min-h-screen flex flex-col gradient-bg">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass border-none mb-8">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                <p className="traits">{result.traits}</p>
                </CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto mt-4">
                  As an Analytical Leader, you combine strategic thinking with leadership abilities. You excel at
                  analyzing complex situations and guiding teams toward efficient solutions through logical and methodical
                  approaches.
                </CardDescription>
              </CardHeader>
            </Card>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personalityTraits.map((trait, index) => (
                <motion.div
                  key={trait.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass border-none h-full hover:bg-primary/5 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          <trait.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{trait.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{trait.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
  
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Card className="glass border-none">
                <CardHeader>
                  <CardTitle>Career Compatibility</CardTitle>
                  <CardDescription>Your personality type is well-suited for roles that require:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Executive Leadership",
                      "Strategic Planning",
                      "Business Analysis",
                      "Management Consulting",
                      "Research Director",
                      "Technology Leadership",
                    ].map((career, index) => (
                      <li key={career} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 text-center"
            >
              <Button className="bg-primary hover:bg-primary/80 transition-colors" onClick={() => window.print()}>
                Download Report
              </Button>
            </motion.div>
          </motion.div>
        </main>
      </div>
      ) : (





        <div className="no-results">
          <p>No results found. Please complete the questionnaire first.</p>
        </div>
      )}
    </div>
  );
}
