"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { saveAssessmentResponse } from "@/app/actions/assessment"

// Full set of 50 questions
const questions = [
  { id: 1, question: "I am the life of the party" },
  { id: 2, question: "I don't talk a lot" },
  { id: 3, question: "I feel comfortable around people" },
  { id: 4, question: "I keep in the background" },
  { id: 5, question: "I start conversations" },
  { id: 6, question: "I have little to say" },
  { id: 7, question: "I talk to a lot of different people at parties" },
  { id: 8, question: "I don't like to draw attention to myself" },
  { id: 9, question: "I don't mind being the center of attention" },
  { id: 10, question: "I am quiet around strangers" },
  { id: 11, question: "I get stressed out easily" },
  { id: 12, question: "I am relaxed most of the time" },
  { id: 13, question: "I worry about things" },
  { id: 14, question: "I seldom feel blue" },
  { id: 15, question: "I am easily disturbed" },
  { id: 16, question: "I get upset easily" },
  { id: 17, question: "I change my mood a lot" },
  { id: 18, question: "I have frequent mood swings" },
  { id: 19, question: "I get irritated easily" },
  { id: 20, question: "I often feel blue" },
  { id: 21, question: "I feel little concern for others" },
  { id: 22, question: "I am interested in people" },
  { id: 23, question: "I insult people" },
  { id: 24, question: "I sympathize with others' feelings" },
  { id: 25, question: "I am not interested in other people's problems" },
  { id: 26, question: "I have a soft heart" },
  { id: 27, question: "I am not really interested in others" },
  { id: 28, question: "I take time out for others" },
  { id: 29, question: "I feel others' emotions" },
  { id: 30, question: "I make people feel at ease" },
  { id: 31, question: "I am always prepared" },
  { id: 32, question: "I leave my belongings around" },
  { id: 33, question: "I pay attention to details" },
  { id: 34, question: "I make a mess of things" },
  { id: 35, question: "I get chores done right away" },
  { id: 36, question: "I often forget to put things back in their proper place" },
  { id: 37, question: "I like order" },
  { id: 38, question: "I shirk my duties" },
  { id: 39, question: "I follow a schedule" },
  { id: 40, question: "I am exacting in my work" },
  { id: 41, question: "I have a rich vocabulary" },
  { id: 42, question: "I have difficulty understanding abstract ideas" },
  { id: 43, question: "I have a vivid imagination" },
  { id: 44, question: "I am not interested in abstract ideas" },
  { id: 45, question: "I have excellent ideas" },
  { id: 46, question: "I do not have a good imagination" },
  { id: 47, question: "I am quick to understand things" },
  { id: 48, question: "I use difficult words" },
  { id: 49, question: "I spend time reflecting on things" },
  { id: 50, question: "I am full of ideas" },
]

const options = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" },
]

const QUESTIONS_PER_PAGE = 10

export default function QuestionnairePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => 
    Array.from({length: questions.length}, () => Math.floor(Math.random() * 5) + 1)
  );
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const startIndex = currentPage * QUESTIONS_PER_PAGE;
  const endIndex = startIndex + QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const handleAnswer = (questionIndex: number, value: string) => {
    const numericValue = parseInt(value, 10);
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = numericValue;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (answers.some((answer) => answer === 0)) {
        throw new Error('Please answer all questions before submitting.');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend-klbu.onrender.com';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      const result = await response.json();
      console.log('Prediction Result:', result);

      // Save the assessment response to the database
      await saveAssessmentResponse(answers, result.cluster, result.traits);

      router.push(`/dashboard?cluster=${result.cluster}&traits=${encodeURIComponent(result.traits)}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Failed to submit answers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const hasAnsweredAll = currentQuestions.every(
    (_, index) => answers[startIndex + index] !== 0,
  );
  const totalAnswered = answers.filter((answer) => answer !== 0).length;
  const progressPercentage = (totalAnswered / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="glass border-none">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Personality Assessment</CardTitle>
              <CardDescription className="text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <span>{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="w-full bg-primary/10 h-2 rounded-full mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {currentQuestions.map((question, index) => {
                    const questionIndex = startIndex + index;
                    return (
                      <div key={question.id} className="space-y-4">
                        <Label className="text-lg font-medium">
                          {questionIndex + 1}. {question.question}
                        </Label>
                        <RadioGroup
                          value={answers[questionIndex].toString()}
                          onValueChange={(value) => handleAnswer(questionIndex, value)}
                          className="grid grid-cols-1 md:grid-cols-5 gap-2"
                        >
                          {options.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center space-x-3 rounded-xl border border-primary/20 p-4 cursor-pointer hover:bg-primary/5 transition-colors"
                            >
                              <RadioGroupItem value={option.value} id={`${questionIndex}-${option.value}`} />
                              <Label
                                htmlFor={`${questionIndex}-${option.value}`}
                                className="flex-grow cursor-pointer text-sm"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstPage}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Page
                </Button>
                {isLastPage ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!hasAnsweredAll || isSubmitting}
                    className="bg-primary hover:bg-primary/80 transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit All'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!hasAnsweredAll}
                    className="bg-primary hover:bg-primary/80 transition-colors"
                  >
                    Next Page
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex justify-center space-x-2 pt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentPage
                        ? 'bg-primary'
                        : answers
                            .slice(index * QUESTIONS_PER_PAGE, (index + 1) * QUESTIONS_PER_PAGE)
                            .some((answer) => answer !== 0)
                          ? 'bg-primary/30'
                          : 'bg-primary/10'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}

