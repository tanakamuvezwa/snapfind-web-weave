import React, { useState } from "react";
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, password);
        setSuccess("Password created successfully! You can now log in with your email and password.");
        setTimeout(() => {
            navigate("/");
        }, 2000);
      } else {
        setError("No user is currently signed in.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create Your Password</h1>
          <p className="text-gray-600 dark:text-gray-400">You've signed in with Google. Create a password to complete your account setup.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                required
                className="pl-10"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm font-medium text-red-500">{error}</p>
          )}
          {success && (
            <p className="text-sm font-medium text-green-500">{success}</p>
          )}

          <Button type="submit" className="w-full">Set Password</Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
