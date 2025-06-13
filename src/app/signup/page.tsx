import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="inline-block mb-4">
            <Icons.Logo className="h-10 w-10 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-headline">Join Siso Today</CardTitle>
          <CardDescription>Create your account to start connecting with musicians</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Create Account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </CardContent>
        <CardContent className="mt-4 text-center text-sm">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary hover:text-primary/80">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
