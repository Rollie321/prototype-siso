import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <Link href="/" className="inline-block mb-4">
            <Icons.Logo className="h-10 w-10 text-primary mx-auto" />
          </Link>
          <CardTitle className="text-3xl font-headline">Welcome Back to Siso</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardContent>
        <CardContent className="mt-4 text-center text-sm">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary hover:text-primary/80">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
