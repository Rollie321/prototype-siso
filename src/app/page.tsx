import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Icons.Logo className="h-7 w-7 text-primary" />
          <span className="ml-2 text-2xl font-headline font-semibold">Siso</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connect, Collaborate, Create Music with <span className="text-primary">Siso</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Siso is the ultimate platform for musicians to find collaborators, share ideas, and bring their musical visions to life.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                    <Link href="/signup">
                      Join Siso Today
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/dashboard">
                      Explore Features
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Hero Image"
                data-ai-hint="musicians collaborating"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Everything Musicians Need</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From finding bandmates to sharing your latest tracks, Siso has you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
              {[
                { title: "Musician Profiles", description: "Showcase your skills, experience, and influences to connect with the right people.", icon: "UserCircle" },
                { title: "Advanced Search", description: "Find musicians by genre, skill, location, and more.", icon: "Search" },
                { title: "Group Collaboration", description: "Create or join bands, manage projects, and collaborate seamlessly.", icon: "Users" },
                { title: "Audio Sharing", description: "Share audio snippets, song ideas, or full tracks with individuals or groups.", icon: "Music2" },
                { title: "Real-time Messaging", description: "Communicate instantly with direct messages and group chats.", icon: "MessageCircle" },
                { title: "AI Musician Finder", description: "Let our AI match you with compatible musicians based on your profile and needs.", icon: "Wand2" },
              ].map((feature) => (
                <div key={feature.title} className="grid gap-2 p-4 rounded-lg border hover:shadow-lg transition-shadow">
                  {/* Placeholder for actual icon components or dynamic import */}
                  {/* <feature.icon className="h-8 w-8 text-primary" /> */}
                  <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                Ready to Amplify Your Musical Journey?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't wait. Join a vibrant community of musicians and start creating magic together.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link href="/signup">Get Started Now</Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Sign up and start connecting.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Siso. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
