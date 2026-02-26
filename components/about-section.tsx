'use client'
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Github, Code, Terminal, Rocket } from "lucide-react";

interface AboutSectionProps {
  variants: any;
  transition: any;
  setActiveTab: (tab: string | null) => void;
}

export default function AboutSection({ variants, transition, setActiveTab }: AboutSectionProps) {
  return (
     <section className="grid md:grid-cols-2 gap-12 py-32 h-full items-center">
        <motion.div
           variants={variants.section}
           transition={transition}
           className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Our Mission.</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              We turn code into reality. Empowering BIUST students to build the next generation of software and hardware.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-12">
            {[
              { title: "Github", icon: Github, color: "text-primary" },
              { title: "Projects", icon: Rocket, color: "text-secondary" },
              { title: "Code", icon: Code, color: "text-accent" },
            ].map((item, i) => (
              <Button 
                key={i} 
                variant="outline" 
                className="h-14 px-8 rounded-2xl bg-card hover:bg-muted transition-all duration-300"
                onClick={() => setActiveTab(item.title.toLowerCase())}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
           variants={variants.section}
           transition={{ ...transition, delay: 0.2 }}
           className="relative"
        >
           <div className="grid grid-cols-1 gap-6">
             {[
               { title: "Open Source", desc: "Everything we build is accessible to everyone.", icon: Terminal },
               { title: "Hardware Hacks", desc: "Crossing the bridge between digital and physical.", icon: Rocket },
               { title: "Collaboration", desc: "Built by our community for our community.", icon: Github },
             ].map((feature, i) => (
               <Card key={i} className="rounded-3xl border-border bg-card/40 backdrop-blur-sm p-6 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                     <div className="p-3 rounded-2xl bg-primary/10">
                        <feature.icon className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground/80">{feature.desc}</CardDescription>
                     </div>
                  </div>
               </Card>
             ))}
           </div>
        </motion.div>
     </section>
  );
}
