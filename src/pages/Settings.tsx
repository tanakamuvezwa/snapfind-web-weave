import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Your username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="New password" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch id="email-notifications" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <Switch id="data-sharing" />
                </div>
                <div className="flex items-center justify-between pt-2">
                    <Label>Manage Blocked Users</Label>
                    <Button variant="outline">Manage</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Language</Label>
                  <span>English</span>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Distance Unit</Label>
                  <div className="flex items-center gap-2">
                    <span>Miles</span>
                    <Switch id="distance-unit" />
                    <span>KM</span>
                  </div>
                </div>
                 <div className="flex items-center justify-between">
                  <Label>Dark Mode</Label>
                  <Switch id="dark-mode" />
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Version: 1.5.0</p>
              </CardContent>
            </Card>
            <div className="flex gap-2">
                <Button className="w-full">Save Changes</Button>
                <Button variant="outline" className="w-full">Discard</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
