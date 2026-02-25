'use client'

import Link from "next/link"
import { Search, Calendar, BookOpen, ArrowRight, Users, Code, Terminal, Rocket, Github, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TextScramble } from "@/components/motion-primitives/text-scramble"

export default function Home() {
  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm font-sans text-foreground selection:bg-primary selection:text-primary-foreground pb-24">
      
      {/* Minimal Hero */}
      <section className="pt-32 pb-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-8 rounded-full px-4 py-1.5 border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Spring 2026 • Accepting Members
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold font-pixel tracking-tighter mb-6 leading-[1.1]">
            <TextScramble as="span" className="font-pixel">Build. Ship.</TextScramble> <br className="hidden md:block"/>
            <TextScramble as="span" className="text-muted-foreground font-pixel">Innovate together.</TextScramble>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            BIUST's premier collective for developers, designers, and hardware hackers. We turn ideas into production-ready reality.
          </p>
          
          <div className="relative max-w-xl flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <Input 
                type="text" 
                placeholder="Search projects, events..." 
                className="pl-12 bg-background border-border focus-visible:ring-primary text-base h-14 rounded-xl"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 rounded-xl font-medium shadow-lg shadow-primary/20">
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Quick Access Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Projects", icon: Rocket, color: "text-primary" },
            { title: "Events", icon: Calendar, color: "text-secondary" },
            { title: "Resources", icon: BookOpen, color: "text-accent" },
            { title: "Members", icon: Users, color: "text-destructive" },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-card hover:bg-muted transition-all duration-300 cursor-pointer border border-border shadow-sm hover:shadow-md">
              <item.icon className={`w-6 h-6 ${item.color} group-hover:-translate-y-1 transition-transform duration-300`} />
              <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 grid gap-12 md:grid-cols-3">
        
        {/* Left Column: Projects & Events */}
        <div className="md:col-span-2 space-y-16">
          
          {/* Projects List */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Active Projects</h2>
              <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                View Repository <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Campus Map App", status: "In Progress", tech: "React Native", desc: "Cross-platform mobile routing for the BIUST campus using dynamic GPS node mapping." },
                { title: "Automated Greenhouse", status: "Testing", tech: "Arduino & IoT", desc: "Sensor networks and automated irrigation logic for the agriculture department prototype." },
                { title: "Club Website V2", status: "Live", tech: "Next.js", desc: "The platform you're looking at right now. Entirely open-source and built by members." },
              ].map((project, i) => (
                <div key={i} className="p-6 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 bg-card/80 backdrop-blur-sm group cursor-pointer hover:shadow-lg shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{project.title}</h3>
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-secondary/10 text-secondary text-xs font-medium">
                      {project.tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Intro to React Workshop", date: "Feb 25 • 14:00", loc: "Lab 3" },
                { title: "Guest Lecture: AI Ethics", date: "Mar 02 • 10:00", loc: "Auditorium" },
                { title: "Weekly Code Review", date: "Fridays • 16:00", loc: "Club Room" },
                { title: "Cybersecurity CTF", date: "Mar 15 • 09:00", loc: "Online" },
              ].map((event, i) => (
                <div key={i} className="p-5 rounded-2xl bg-muted/50 border border-transparent hover:border-primary/10 transition-colors">
                  <h3 className="font-semibold text-foreground mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {event.date}</span>
                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-secondary" /> {event.loc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          
          {/* Stark Join Card */}
          <Card className="bg-primary text-primary-foreground border-0 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl tracking-tight">Join the club.</CardTitle>
              <CardDescription className="text-primary-foreground/70 text-base">
                Get access to hardware, workshops, and our private repos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8 text-primary-foreground/80 text-sm font-medium">
                <li className="flex items-center gap-3"><Code className="w-4 h-4 text-primary-foreground/50" /> Build real-world projects</li>
                <li className="flex items-center gap-3"><Users className="w-4 h-4 text-primary-foreground/50" /> Network with industry alumni</li>
                <li className="flex items-center gap-3"><Terminal className="w-4 h-4 text-primary-foreground/50" /> Access the hardware lab</li>
              </ul>
              <Button className="w-full bg-background hover:bg-background/90 text-primary font-bold rounded-xl h-12 shadow-inner border border-white/10">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          {/* Clean Links */}
          <div className="p-6 rounded-2xl border border-border bg-card/50">
            <h3 className="font-semibold mb-4 text-foreground">Links</h3>
            <div className="space-y-1">
              {[
                { title: "GitHub Org", icon: Github, color: "text-secondary" },
                { title: "Discord Server", icon: MessageSquare, color: "text-destructive" },
                { title: "Lab Access Forms", icon: Terminal, color: "text-accent" },
              ].map((item, i) => (
                <div key={i} className="p-3 -mx-3 rounded-xl hover:bg-muted transition-colors cursor-pointer flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all font-bold" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export function TextScrambleBasic() {
  return (
    <TextScramble className='font-pixel text-sm uppercase'>
      Text Scramble
    </TextScramble>
  );
}