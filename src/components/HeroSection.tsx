import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import TaskBoard from './TaskBoard';
import { Loader, Mail, X, Expand, Wallet, DollarSign, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import vallumLogo from '@/assets/vallum-logo.png';
import ethLogo from '@/assets/eth-logo.png';
import solLogo from '@/assets/sol-logo.png';
import bitcoinLogo from '@/assets/bitcoin-logo.png';
const waitlistSchema = z.object({
  email: z.string().trim().email({
    message: "Please enter a valid email address"
  }).max(255, {
    message: "Email must be less than 255 characters"
  })
});
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('portfolio'); // New state for tracking active section
  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: ""
    }
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  const onSubmit = async (values: z.infer<typeof waitlistSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxzGka0_BKNuF4kMMk-IEhhaK0PzfSIy1XuN48ifxa-nKpeaJJl73M0ajbtmnhjlX9PPg/exec', {
        method: 'POST',
        mode: 'no-cors',
        // This fixes the CORS issue
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          timestamp: new Date().toISOString()
        })
      });

      // With no-cors mode, we can't read the response status
      // But the request will be sent successfully to Google Sheets
      toast.success("You've been added to the waitlist!");
      form.reset();
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="home" className="relative w-full py-6 md:py-10 px-6 md:px-12 overflow-hidden bg-background">
      {/* Cosmic particle effect (background dots) */}
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full">
        <div className="w-full h-full opacity-10 bg-primary blur-[120px]"></div>
      </div>
      
      {/* Hero Content - Title and Form */}
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-center min-h-[60vh] transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left Side - Title */}
          <div className="space-y-8 min-w-0">
            <div className="flex justify-center">
                
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-foreground leading-[0.85]">
              <span className="whitespace-nowrap"><span className="font-black">Y</span>our wallet.</span><br />
              <span className="whitespace-nowrap"><span className="font-black">Y</span>our rules.</span><br />
              <span className="text-primary whitespace-nowrap"><span className="font-black">N</span>o fear.</span>
            </h1>
            
            
          </div>
          
          {/* Right Side - Waitlist Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="relative">
                {/* Glassmorphic container */}
                <div className="absolute inset-0 bg-card/30 backdrop-blur-md rounded-2xl border border-border/50"></div>
                <div className="relative p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
                  <div className="text-center space-y-2">
                    <Mail className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="text-2xl font-semibold text-foreground">Unlock Premium Features</h3>
                    
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="email" render={({
                      field
                    }) => <FormItem>
                            <FormControl>
                              <Input {...field} type="email" placeholder="Enter your email address" className="h-12 bg-background/50 border-border/50 backdrop-blur-sm focus:border-primary focus:bg-background/80 transition-all" disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />
                      
                      <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium" disabled={isSubmitting}>
                        {isSubmitting ? <>
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                            Joining...
                          </> : 'Join Waitlist'}
                      </Button>
                    </form>
                  </Form>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Wallet Dashboard */}
      <div id="dashboard" className={`w-full max-w-7xl mx-auto mt-16 z-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        {/* Desktop Dashboard - Hidden on mobile */}
        <div className="hidden lg:block relative rounded-2xl overflow-hidden border border-border/20 bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-background/95 to-background/98 backdrop-blur-xl border-b border-border/30">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <img src={vallumLogo} alt="Vallum Logo" className="h-10 w-10 object-contain" />
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">Vallum Wallet</h1>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Secure</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="h-10 w-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </button>
                  <button className="h-10 w-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="flex flex-col lg:flex-row h-[500px] sm:h-[600px] lg:h-[750px]">
            {/* Sidebar */}
            <div className="lg:w-80 border-r border-border/30 bg-card/50 backdrop-blur-sm">
              <div className="p-6 space-y-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                    <span className="text-sm font-medium">Send</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform">
                      <path d="M7 7L17 17" />
                      <path d="M17 7v10H7" />
                    </svg>
                    <span className="text-sm font-medium">Receive</span>
                  </button>
                </div>

                {/* Navigation */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Navigation</h3>
                  <nav className="space-y-1">
                    <button onClick={() => setActiveSection('portfolio')} className={`flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left transition-colors ${activeSection === 'portfolio' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9,22 9,12 15,12 15,22" />
                      </svg>
                      <span>Portfolio</span>
                    </button>
                    <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18" />
                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                      </svg>
                      <span>Markets</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                      </svg>
                      <span>History</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 10L12 5L17 10" />
                        <path d="M17 14L12 19L7 14" />
                      </svg>
                      <span>Swap</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      <span>Earn</span>
                    </a>
                    <button onClick={() => setActiveSection('security')} className={`flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left transition-colors ${activeSection === 'security' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      <span>Security Hub</span>
                    </button>
                  </nav>
                </div>

                {/* Assets */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Your Assets</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={solLogo} alt="Solana" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Solana</p>
                        <p className="text-xs text-muted-foreground">72.3 SOL</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={bitcoinLogo} alt="Bitcoin" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Bitcoin</p>
                        <p className="text-xs text-muted-foreground">0.1241 BTC</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={ethLogo} alt="Ethereum" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Ethereum</p>
                        <p className="text-xs text-muted-foreground">3.28 ETH</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-8 bg-background/50 overflow-y-auto">
              {activeSection === 'portfolio' ? (/* Portfolio Overview */
            <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Portfolio Overview</h2>
                      <p className="text-muted-foreground">Track your crypto investments</p>
                    </div>
                  <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                    <button className="px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">1D</button>
                    <button className="px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">1W</button>
                    <button className="px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">1M</button>
                    <button className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground transition-colors">1Y</button>
                    <button className="px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">ALL</button>
                  </div>
                </div>

                {/* Portfolio Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20m8-18H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                        </svg>
                        <span className="text-sm font-medium">Total Balance</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">$32,624.92</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-green-500 flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M7 17L17 7" />
                              <path d="M7 7h10v10" />
                            </svg>
                            55%
                          </span>
                          <span className="text-green-500">+$17,672.77</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3v18h18" />
                          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                        </svg>
                        <span className="text-sm font-medium">24h Change</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">+11.28%</p>
                        <p className="text-sm text-green-500">+$3,321.40</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="8" cy="21" r="1" />
                          <circle cx="19" cy="21" r="1" />
                          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                        </svg>
                        <span className="text-sm font-medium">Assets</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl lg:text-3xl font-bold text-foreground">4</p>
                        <p className="text-sm text-muted-foreground">Cryptocurrencies</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                  <div className="h-48 sm:h-64 lg:h-80">
                    <svg width="100%" height="100%" viewBox="0 0 800 300" className="text-primary">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      
                      <rect width="100%" height="100%" fill="url(#grid)" opacity="0.4" />
                      
                      {/* Y-axis labels */}
                      <text x="20" y="50" className="text-xs fill-muted-foreground font-medium">$40k</text>
                      <text x="20" y="125" className="text-xs fill-muted-foreground font-medium">$30k</text>
                      <text x="20" y="200" className="text-xs fill-muted-foreground font-medium">$20k</text>
                      <text x="20" y="275" className="text-xs fill-muted-foreground font-medium">$10k</text>
                      
                      {/* X-axis labels */}
                      <text x="80" y="290" className="text-xs fill-muted-foreground">Jun</text>
                      <text x="180" y="290" className="text-xs fill-muted-foreground">Aug</text>
                      <text x="280" y="290" className="text-xs fill-muted-foreground">Oct</text>
                      <text x="380" y="290" className="text-xs fill-muted-foreground">Dec</text>
                      <text x="480" y="290" className="text-xs fill-muted-foreground">Feb</text>
                      <text x="580" y="290" className="text-xs fill-muted-foreground">Apr</text>
                      <text x="680" y="290" className="text-xs fill-muted-foreground">Jun</text>
                      
                      {/* Chart line */}
                      <path d="M80,220 Q140,210 200,200 Q260,195 320,180 Q380,165 440,150 Q500,135 560,120 Q620,105 680,90" stroke="url(#chartGradient)" strokeWidth="3" fill="none" className="drop-shadow-sm" />
                      
                      {/* Chart area */}
                      <path d="M80,220 Q140,210 200,200 Q260,195 320,180 Q380,165 440,150 Q500,135 560,120 Q620,105 680,90 L680,270 L80,270 Z" fill="url(#chartAreaGradient)" />
                      
                      {/* Data points */}
                      <circle cx="680" cy="90" r="4" fill="hsl(var(--primary))" className="drop-shadow-sm" />
                    </svg>
                  </div>
                </div>
              </div>) : (/* Security Hub */
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Security Hub</h2>
                    <p className="text-muted-foreground">Configure your wallet security settings</p>
                  </div>
                </div>

                {/* Security Settings Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Transaction Limit */}
                    <div className="p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="w-5 h-5" />
                          <h3 className="text-lg font-semibold text-foreground">Transaction Limit</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Set maximum amount per transaction</p>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Amount (USD)</label>
                          <input type="number" placeholder="Enter transaction limit" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* Inactive Hours */}
                    <div className="p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-5 h-5" />
                          <h3 className="text-lg font-semibold text-foreground">Inactive Hours (CT)</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Set hours when transactions are blocked (Central Time)</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">From</label>
                            <input type="time" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">To</label>
                            <input type="time" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Wallet */}
                  <div className="p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Wallet className="w-5 h-5" />
                          <h3 className="text-lg font-semibold text-foreground">Secondary Wallet</h3>
                        </div>
                      <p className="text-sm text-muted-foreground">Add a secondary wallet address for emergency fund rerouting </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Wallet Address</label>
                          <input type="text" placeholder="Enter Solana wallet address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                            Verify Address
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Settings Button */}
                  <div className="flex justify-end">
                    <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                      Save Security Settings
                    </button>
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </div>

        {/* Mobile Dashboard Preview - Click to expand */}
        <div className="lg:hidden">
          <div className="relative rounded-2xl overflow-hidden border border-border/20 bg-card/95 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300" onClick={() => setIsDashboardExpanded(true)}>
            {/* Click to expand overlay */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-10">
              <div className="bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-primary-foreground shadow-lg">
                <Expand className="h-4 w-4" />
                <span className="text-sm font-medium">Tap to explore dashboard</span>
              </div>
            </div>

            {/* Scaled down dashboard preview */}
            <div className="transform scale-75 origin-top-left -m-[12.5%]">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-background/95 to-background/98 backdrop-blur-xl border-b border-border/30">
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <img src={vallumLogo} alt="Vallum Logo" className="h-10 w-10 object-contain" />
                      <div>
                        <h1 className="text-xl font-semibold text-foreground">Vallum Wallet</h1>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Secure</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="flex h-[500px]">
                {/* Sidebar */}
                <div className="w-80 border-r border-border/30 bg-card/50 backdrop-blur-sm">
                  <div className="p-6 space-y-6">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary text-primary-foreground">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                        <span className="text-sm font-medium">Send</span>
                      </div>
                      <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-muted">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 7L17 17" />
                          <path d="M17 7v10H7" />
                        </svg>
                        <span className="text-sm font-medium">Receive</span>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Navigation</h3>
                      <nav className="space-y-1">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/10 text-primary font-medium">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9,22 9,12 15,12 15,22" />
                          </svg>
                          <span>Portfolio</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3v18h18" />
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                          </svg>
                          <span>Markets</span>
                        </div>
                      </nav>
                    </div>

                    {/* Assets */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Your Assets</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                          <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                            <img src={solLogo} alt="Solana" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">Solana</p>
                            <p className="text-xs text-muted-foreground">72.3 SOL</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-6 bg-background/50">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Portfolio Overview</h2>
                      <p className="text-muted-foreground">Track your crypto investments</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Total Balance</p>
                          <p className="text-xl font-bold text-foreground">$32,624.92</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">24h Change</p>
                          <p className="text-xl font-bold text-foreground">+11.28%</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Assets</p>
                          <p className="text-xl font-bold text-foreground">4</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                      <div className="h-32">
                        <svg width="100%" height="100%" viewBox="0 0 400 150" className="text-primary">
                          <path d="M40,110 Q70,105 100,100 Q130,97 160,90 Q190,82 220,75 Q250,67 280,60 Q310,52 340,45" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                          <circle cx="340" cy="45" r="3" fill="hsl(var(--primary))" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Dashboard Modal */}
        {isDashboardExpanded && <div className="lg:hidden fixed inset-0 bg-card/95 backdrop-blur-xl z-50 overflow-auto">
            {/* Close button */}
            <button onClick={() => setIsDashboardExpanded(false)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/80 backdrop-blur-sm hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </button>

            {/* Full Desktop Dashboard - No scaling, full screen */}
            <div className="w-full min-h-screen pt-16">
              <div className="w-full h-full bg-card/95 backdrop-blur-xl">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-background/95 to-background/98 backdrop-blur-xl border-b border-border/30">
                  <div className="flex items-center justify-between p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <img src={vallumLogo} alt="Vallum Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
                        <div>
                          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Vallum Wallet</h1>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs sm:text-sm text-green-600 font-medium">Secure</span>
                      </div>
                      
                      <div className="hidden sm:flex items-center gap-2">
                        <button className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                        <button className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content - Mobile responsive */}
                <div className="flex flex-col lg:flex-row min-h-screen">
                  {/* Sidebar - Mobile responsive */}
                  <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-border/30 bg-card/50 backdrop-blur-sm">
                    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform sm:w-6 sm:h-6">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                          <span className="text-xs sm:text-sm font-medium">Send</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform sm:w-6 sm:h-6">
                            <path d="M7 7L17 17" />
                            <path d="M17 7v10H7" />
                          </svg>
                          <span className="text-xs sm:text-sm font-medium">Receive</span>
                        </button>
                      </div>

                      {/* Navigation */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Navigation</h3>
                        <nav className="space-y-1">
                          <button onClick={() => setActiveSection('portfolio')} className={`flex items-center gap-3 px-3 py-2 sm:py-3 rounded-xl w-full text-left transition-colors ${activeSection === 'portfolio' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9,22 9,12 15,12 15,22" />
                            </svg>
                            <span className="text-sm sm:text-base">Portfolio</span>
                          </button>
                          <a href="#" className="flex items-center gap-3 px-3 py-2 sm:py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M3 3v18h18" />
                              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                            </svg>
                            <span className="text-sm sm:text-base">Markets</span>
                          </a>
                          <a href="#" className="flex items-center gap-3 px-3 py-2 sm:py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                            </svg>
                            <span className="text-sm sm:text-base">History</span>
                          </a>
                          <a href="#" className="flex items-center gap-3 px-3 py-2 sm:py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M7 10L12 5L17 10" />
                              <path d="M17 14L12 19L7 14" />
                            </svg>
                            <span className="text-sm sm:text-base">Swap</span>
                          </a>
                          <a href="#" className="flex items-center gap-3 px-3 py-2 sm:py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M12 2v20" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            <span className="text-sm sm:text-base">Earn</span>
                          </a>
                          <button onClick={() => setActiveSection('security')} className={`flex items-center gap-3 px-3 py-2 sm:py-3 rounded-xl w-full text-left transition-colors ${activeSection === 'security' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-5 sm:h-5">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                              <path d="M9 12l2 2 4-4" />
                            </svg>
                            <span className="text-sm sm:text-base">Security Hub</span>
                          </button>
                        </nav>
                      </div>

                      {/* Assets */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Your Assets</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                              <img src={solLogo} alt="Solana" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">Solana</p>
                              <p className="text-xs text-muted-foreground">72.3 SOL</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                              <img src={bitcoinLogo} alt="Bitcoin" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">Bitcoin</p>
                              <p className="text-xs text-muted-foreground">0.1241 BTC</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                            <div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
                              <img src={ethLogo} alt="Ethereum" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">Ethereum</p>
                              <p className="text-xs text-muted-foreground">3.28 ETH</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main Content - Mobile responsive */}
                  <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/50 overflow-y-auto">
                    {activeSection === 'portfolio' ? (/* Portfolio Overview */
                <div className="space-y-6 sm:space-y-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Portfolio Overview</h2>
                            <p className="text-sm text-muted-foreground">Track your crypto investments</p>
                          </div>
                        <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 w-fit">
                          <button className="px-2 sm:px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">1D</button>
                          <button className="px-2 sm:px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">1W</button>
                          <button className="px-2 sm:px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">1M</button>
                          <button className="px-2 sm:px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground transition-colors">1Y</button>
                          <button className="px-2 sm:px-3 py-1.5 text-xs rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors">ALL</button>
                        </div>
                      </div>

                      {/* Portfolio Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20m8-18H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                              </svg>
                              <span className="text-sm font-medium">Total Balance</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-2xl lg:text-3xl font-bold text-foreground">$32,624.92</p>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-500 flex items-center gap-1">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7" />
                                    <path d="M7 7h10v10" />
                                  </svg>
                                  +$1,824.31
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 3v18h18" />
                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                              </svg>
                              <span className="text-sm font-medium">24h Change</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-2xl lg:text-3xl font-bold text-foreground">+11.28%</p>
                              <p className="text-sm text-green-500">+$3,321.40</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 lg:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                              </svg>
                              <span className="text-sm font-medium">Assets</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-2xl lg:text-3xl font-bold text-foreground">4</p>
                              <p className="text-sm text-muted-foreground">Cryptocurrencies</p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>) : (/* Security Hub - Mobile */
                <div className="space-y-6 sm:space-y-8">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Security Hub</h2>
                            <p className="text-sm text-muted-foreground">Configure your wallet security settings</p>
                          </div>
                        </div>

                        {/* Security Settings Form - Mobile */}
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-6">
                            {/* Transaction Limit */}
                            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <DollarSign className="w-5 h-5" />
                                  <h3 className="text-base sm:text-lg font-semibold text-foreground">Transaction Limit</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">Set maximum amount per transaction</p>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-foreground">Amount (USD)</label>
                                  <input type="number" placeholder="Enter transaction limit" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                </div>
                              </div>
                            </div>

                            {/* Inactive Hours */}
                            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="w-5 h-5" />
                                  <h3 className="text-base sm:text-lg font-semibold text-foreground">Inactive Hours (CT)</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">Set hours when transactions are blocked (Central Time)</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">From</label>
                                    <input type="time" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">To</label>
                                    <input type="time" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Secondary Wallet */}
                            <div className="p-4 sm:p-6 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Wallet className="w-5 h-5" />
                                  <h3 className="text-base sm:text-lg font-semibold text-foreground">Secondary Wallet</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">Add a secondary wallet address for fund rerouting if needed</p>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Wallet Address</label>
                                    <input type="text" placeholder="Enter Solana wallet address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                                  </div>
                                  <div className="flex flex-col sm:flex-row gap-3">
                                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                                      Verify Address
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-colors">
                                      Test Connection
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Save Settings Button */}
                            <div className="flex justify-end">
                              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                                Save Security Settings
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </section>;
};
export default HeroSection;