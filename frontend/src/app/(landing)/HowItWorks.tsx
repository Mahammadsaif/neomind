"use client";

import { motion } from "framer-motion";
import { Bolt, BookOpen, MessageSquare } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Capture Anything",
      desc: "Save thoughts, highlights, notes, and ideas directly from the web or your workflow.",
      icon: <Bolt className="w-6 h-6 text-neo-primary" />,
      glow: "from-neo-primary/30",
    },
    {
      title: "NeoMind Remembers",
      desc: "Everything captured is indexed and becomes part of your intelligent memory.",
      icon: <BookOpen className="w-6 h-6 text-neo-accent" />,
      glow: "from-neo-accent/30",
    },
    {
      title: "Ask & Understand",
      desc: "Ask NeoMind anything — it answers using your real context, not generic information.",
      icon: <MessageSquare className="w-6 h-6 text-neo-primary" />,
      glow: "from-neo-primary/30",
    },
  ];

  return (
    <section className="relative py-24 px-6">

      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 
        bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_70%)]" 
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Title */}
        <motion.h2
          className="text-center text-4xl md:text-5xl font-bold text-neo-on"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How NeoMind Works
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon Wrapper */}
              <div className="relative mb-6">
                <div
                  className="
                    p-4 rounded-full 
                    bg-gradient-to-br from-white/10 to-white/5 
                    border border-white/10 
                    shadow-[0_0_40px_-12px_rgba(20,184,166,0.4)]
                    flex items-center justify-center
                  "
                >
                  {step.icon}
                </div>

                {/* Soft Glow */}
                <div className={`absolute inset-0 -z-10 blur-2xl 
                  bg-gradient-to-br ${step.glow} to-transparent rounded-full`} 
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-neo-on mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-neo-muted text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}