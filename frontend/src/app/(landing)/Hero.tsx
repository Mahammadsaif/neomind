"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden landing-bg">
      
      {/* Soft Signature Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,rgba(20,184,166,0.08)_45%,transparent_80%)] blur-3xl opacity-70" />

      <div className="relative max-w-4xl text-center z-10 flex flex-col gap-8">

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-neo-on leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          It’s not about remembering more —
          <br />
          <span className="text-neo-accent">it’s about never losing what matters.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-neo-muted max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          NeoMind unifies your thoughts, notes, tasks, and context into a single intelligent memory system.
          Always available. Always aware.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button variant="primary" className="px-8 py-3 text-base rounded-2xl">
            Get Early Access
          </Button>

          <Button variant="outline" className="px-8 py-3 text-base rounded-2xl">
            Learn More
          </Button>
        </motion.div>

        {/* Premium Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative mt-14"
        >
          <div className="
            max-w-xl mx-auto rounded-3xl p-6 
            bg-white/3 backdrop-blur-xl 
            border border-white/10
            shadow-[0_0_60px_-15px_rgba(99,102,241,0.4)]
          ">
            <p className="text-neo-on/90 text-sm">
              “NeoMind, summarize my last research notes.”
            </p>

            <div className="mt-4 flex flex-col gap-2 text-sm text-neo-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neo-accent"></span>
                Context-aware reply
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neo-accent"></span>
                Memory recall
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neo-accent"></span>
                Intelligent follow-up
              </div>
            </div>
          </div>

          {/* Glow Behind Card */}
          <div className="absolute inset-0 -z-10 blur-3xl 
            bg-gradient-to-br from-neo-primary/40 to-neo-accent/20 rounded-3xl 
          "></div>
        </motion.div>

      </div>
    </section>
  );
}