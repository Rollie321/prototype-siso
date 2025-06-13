import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Activity, ArrowUpRight, Users, Music2, MessageSquare, Wand2 } from "lucide-react";

const quickLinks = [
  { title: "Find Musicians", href: "/search", icon: Users, description: "Discover new collaborators." },
  { title: "Share Audio", href: "/feed/upload", icon: Music2, description: "Upload your latest ideas." },
  { title: "Start a Chat", href: "/messages", icon: MessageSquare, description: "Connect with your peers." },
  { title: "AI Matchmaker", href: "/ai-finder", icon: Wand2, description: "Get AI-powered suggestions." },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-semibold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map(link => (
          <Card key={link.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
              <link.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">{link.description}</p>
              <Button size="sm" asChild variant="outline" className="w-full">
                <Link href={link.href}>Go to {link.title.split(" ")[0]}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
            <CardDescription>An overview of recent interactions and updates.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Placeholder for activity feed */}
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center p-2 rounded-md hover:bg-muted/50">
                  <AvatarImage src={`https://placehold.co/40x40.png?text=A${i}`} alt="User" className="h-10 w-10 rounded-full mr-3" data-ai-hint="user avatar" />
                  <div>
                    <p className="text-sm font-medium">User {i} posted a new track: "Song Title {i}"</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">My Projects</CardTitle>
            <CardDescription>Overview of your ongoing collaborations.</CardDescription>
          </CardHeader>
          <CardContent>
             {/* Placeholder for projects */}
            <div className="space-y-3">
              {["Rock Band Project", "Acoustic Duet", "Electronic Jam Session"].map((project, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/5 transition-colors">
                  <div>
                    <h4 className="font-medium">{project}</h4>
                    <p className="text-xs text-muted-foreground">Last update: {idx + 1} day(s) ago</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/groups/1">View <ArrowUpRight className="h-4 w-4 ml-1" /></Link>
                  </Button>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" asChild>
              <Link href="/groups/create">Create New Project</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Discover New Music</CardTitle>
          <CardDescription>Fresh tracks and collaborations from the Siso community.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1,2,3,4].map(item => (
            <Card key={item} className="overflow-hidden hover:shadow-md transition-shadow">
              <Image src={`https://placehold.co/300x200.png`} alt="Album art" width={300} height={200} className="w-full aspect-[3/2] object-cover" data-ai-hint="album art music" />
              <CardContent className="p-3">
                <h4 className="font-semibold">Track Title {item}</h4>
                <p className="text-sm text-muted-foreground">Artist Name {item}</p>
                <Button variant="link" size="sm" className="p-0 h-auto mt-1">Play</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
