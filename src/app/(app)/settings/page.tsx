import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-headline font-semibold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Account Information</CardTitle>
          <CardDescription>Manage your personal and account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Alex Rivera" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="alex.rivera@example.com" />
          </div>
          <Button variant="outline">Update Profile</Button>
          <Separator className="my-4" />
          <div className="space-y-1">
            <Label htmlFor="password">Change Password</Label>
            <Input id="password" type="password" placeholder="Current password" />
            <Input id="newPassword" type="password" placeholder="New password" className="mt-2" />
            <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="mt-2" />
          </div>
          <Button>Change Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary" /> Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications from Siso.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive updates about new messages, group activity, and matches.
              </span>
            </Label>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Get real-time alerts on your device (if app installed).
              </span>
            </Label>
            <Switch id="pushNotifications" />
          </div>
           <div className="flex items-center justify-between">
            <Label htmlFor="newsletter" className="flex flex-col space-y-1">
              <span>Siso Newsletter</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Stay updated with Siso news, tips, and feature releases.
              </span>
            </Label>
            <Switch id="newsletter" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Privacy & Security</CardTitle>
          <CardDescription>Manage your privacy settings and account security.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="profileVisibility" className="flex flex-col space-y-1">
              <span>Profile Visibility</span>
               <span className="font-normal leading-snug text-muted-foreground">
                Control who can see your profile details.
              </span>
            </Label>
            {/* Placeholder for select component */}
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <Button variant="link" className="p-0 h-auto text-destructive">Deactivate Account</Button>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Appearance</CardTitle>
          <CardDescription>Customize the look and feel of Siso.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
               <span className="font-normal leading-snug text-muted-foreground">
                Toggle between light and dark themes.
              </span>
            </Label>
            {/* Placeholder for theme toggle logic */}
            <Switch id="darkMode" onCheckedChange={() => {
              // This is a basic toggle, actual theme switching is more complex
              document.documentElement.classList.toggle('dark');
            }}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
