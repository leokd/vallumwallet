import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Vallum different than other wallets?",
      answer: "Unlike traditional hot wallets that only store your assets, Vallum actively protects them. With AI-powered contract translations, customizable security rules, and automatic fund rerouting, it gives you proactive defense while keeping full self-custody."
    },
    {
      question: "What happens if a hacker tries to drain my wallet?",
      answer: "Even if a hacker gains access to your private keys, they can't simply empty your wallet. When they attempt a transaction, Vallum's smart logic checks it against your pre-set security rules. If the request violates your rules — like exceeding a limit or happening during inactive hours — Vallum automatically triggers emergency protection and reroutes your funds to your backup wallet instantly. This stops the attack before it succeeds."
    },
    {
      question: "Can I set my own security rules?",
      answer: "Yes. You choose the limits — like maximum transaction size or blocking activity during inactive hours. Vallum enforces these rules automatically, giving you protection tailored to your lifestyle."
    },
    {
      question: "Where are my funds rerouted to?",
      answer: "If a rule is triggered, your funds are transferred to a secondary wallet that you've predefined. You choose the destination, so your assets are always under your control."
    },
    {
      question: "Do I maintain full control of my funds?",
      answer: "Absolutely. Vallum is a self-custody wallet — only you hold your private keys. We can't access your assets or move them on your behalf."
    },
    {
      question: "Which assets and blockchains does Vallum support?",
      answer: "Vallum is launching on Solana first, with plans to expand to multiple blockchains. Our goal is to support the most widely used networks for both DeFi and everyday transactions."
    },
    {
      question: "What do I get for joining the waitlist?",
      answer: "Early access to Vallum, plus exclusive premium features for free. You'll also be among the first to shape the future of proactive wallet security."
    }
  ];

  return (
    <section id="faq" className="w-full py-20 px-6 md:px-12 bg-card">
      
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground font-poppins">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base font-poppins leading-relaxed max-w-2xl mx-auto">
            Get answers to common questions about Vallum's security features and functionality.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/50 rounded-2xl bg-card/30 backdrop-blur-md hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="text-lg font-medium text-foreground font-poppins">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground font-poppins leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;