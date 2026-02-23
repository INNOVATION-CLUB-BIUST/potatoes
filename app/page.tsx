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

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-950 selection:bg-zinc-900 selection:text-white pb-24">
      
      {/* Minimal Hero */}
      <section className="pt-32 pb-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-8 rounded-full px-4 py-1.5 border-zinc-200 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Spring 2026 • Accepting Members
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
            Build. Ship. <br className="hidden md:block"/>
            <span className="text-zinc-400">Innovate together.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl leading-relaxed">
            BIUST's premier collective for developers, designers, and hardware hackers. We turn ideas into production-ready reality.
          </p>
          
          <div className="relative max-w-xl flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <Input 
                type="text" 
                placeholder="Search projects, events..." 
                className="pl-12 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950 text-base h-14 rounded-xl"
              />
            </div>
            <Button className="bg-zinc-950 hover:bg-zinc-800 text-white h-14 px-8 rounded-xl font-medium">
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Quick Access Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Projects", icon: Rocket },
            { title: "Events", icon: Calendar },
            { title: "Resources", icon: BookOpen },
            { title: "Members", icon: Users },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col items-center justify-center gap-3 p-8 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
              <item.icon className="w-6 h-6 text-zinc-900 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="font-medium text-sm text-zinc-600 group-hover:text-zinc-950 transition-colors">{item.title}</span>
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
              <Button variant="ghost" className="text-zinc-500 hover:text-zinc-950">
                View Repository <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Campus Map App", status: "In Progress", tech: "React Native", desc: "Cross-platform mobile routing for the BIUST campus using dynamic GPS node mapping." },
                { title: "Automated Greenhouse", status: "Testing", tech: "Arduino & IoT", desc: "Sensor networks and automated irrigation logic for the agriculture department prototype." },
                { title: "Club Website V2", status: "Live", tech: "Next.js", desc: "The platform you're looking at right now. Entirely open-source and built by members." },
              ].map((project, i) => (
                <div key={i} className="p-6 rounded-2xl border border-zinc-100 hover:border-zinc-300 transition-colors bg-white group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <Badge variant="outline" className="bg-zinc-50 text-zinc-500 border-zinc-200">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{project.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 text-xs font-medium">
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
                <div key={i} className="p-5 rounded-2xl bg-zinc-50">
                  <h3 className="font-semibold text-zinc-900 mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-zinc-500">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-zinc-400" /> {event.date}</span>
                    <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-zinc-400" /> {event.loc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          
          {/* Stark Join Card */}
          <Card className="bg-zinc-950 text-white border-0 rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl tracking-tight">Join the club.</CardTitle>
              <CardDescription className="text-zinc-400 text-base">
                Get access to hardware, workshops, and our private repos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8 text-zinc-300 text-sm">
                <li className="flex items-center gap-3"><Code className="w-4 h-4 text-zinc-500" /> Build real-world projects</li>
                <li className="flex items-center gap-3"><Users className="w-4 h-4 text-zinc-500" /> Network with industry alumni</li>
                <li className="flex items-center gap-3"><Terminal className="w-4 h-4 text-zinc-500" /> Access the hardware lab</li>
              </ul>
              <Button className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold rounded-xl h-12">
                Apply Now
              </Button>
            </CardContent>
          </Card>

          {/* Clean Links */}
          <div className="p-6 rounded-2xl border border-zinc-100">
            <h3 className="font-semibold mb-4 text-zinc-900">Links</h3>
            <div className="space-y-1">
              {[
                { title: "GitHub Org", icon: Github },
                { title: "Discord Server", icon: MessageSquare },
                { title: "Lab Access Forms", icon: Terminal },
              ].map((item, i) => (
                <div key={i} className="p-3 -mx-3 rounded-xl hover:bg-zinc-50 transition-colors cursor-pointer flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                    <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-950 transition-colors">{item.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}