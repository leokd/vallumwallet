import React from 'react';
import { Shield, Brain, ArrowRightLeft } from 'lucide-react';

const Testimonials = () => {
  const features = [{
    title: "Readable dApp Contracts",
    description: "Vallum explains contracts in plain language when connecting to a dApp.",
    icon: Brain,
    gradient: "from-blue-500/20 to-cyan-500/20"
  }, {
    title: "Custom Security Rules",
    description: "Set limits for daily transactions or activity during off hours.",
    icon: Shield,
    gradient: "from-green-500/20 to-emerald-500/20"
  }, {
    title: "Emergency Auto Transfer",
    description: "If a rule is triggered, funds are automatically moved to your backup wallet.",
    icon: ArrowRightLeft,
    gradient: "from-purple-500/20 to-pink-500/20"
  }];

  return <section id="features" className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full">
        <div className="w-full h-full opacity-5 bg-primary blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground font-poppins">
            Our Features
          </h2>
          <p className="text-muted-foreground text-base font-poppins leading-relaxed max-w-2xl mx-auto">Vallum combines the convenience of a self-custody hot wallet with customizable security features no other wallet offers. Unlike traditional hot wallets that simply store your assets, Vallum actively protects them, giving users full control of their funds.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md hover:border-border/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Gradient background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Card content */}
                <div className="relative p-8 space-y-6">
                  {/* Icon with glow effect */}
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground font-poppins group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-poppins leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Subtle bottom accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>;
};
export default Testimonials;