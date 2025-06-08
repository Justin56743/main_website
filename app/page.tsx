"use client"

import { motion } from "framer-motion"
import { ArrowRight, Brain, Fingerprint, Zap } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { handleGetStarted } from "./actions/auth"

export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Discover Your True Self with AI
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Uncover your personality type using cutting-edge artificial intelligence.
            </p>
          </motion.div>
          {/* <form action={ async() => {
            "use server"
            const session = await auth()
            if(session?.user) {
              redirect("/questionnaire")
            }
            else redirect('/login')
          }}> */}
            <Button size="lg" onClick={handleGetStarted} className="bg-primary hover:bg-primary/80 transition-colors">
              {/* <Link href="/questionnaire"> */}
                Get Started <ArrowRight className="ml-2" />
              {/* </Link> */}
            </Button>
           {/* </form> */}
           {/* <GetStartedButton /> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: "AI-Powered Analysis",
              description: "Our advanced AI algorithms provide deep insights into your personality.",
            },
            {
              icon: Fingerprint,
              title: "Unique to You",
              description: "Get a personalized analysis that's as individual as you are.",
            },
            {
              icon: Zap,
              title: "Quick Results",
              description: "Receive your personality insights in minutes, not hours.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass p-6 rounded-2xl hover-glow transition-all duration-300"
            >
              <feature.icon className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

