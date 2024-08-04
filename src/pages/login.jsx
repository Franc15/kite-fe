import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/apiService"; // Import your login function

export function Login() {
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await login(data); 
      setSuccessMessage("Login successful!");
      console.log(response);

      // store token and user data in local storage
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Redirect to dashboard after a short delay to let users see the success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // Adjust the delay as needed
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm mx-4 md:mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <p className="text-sm text-gray-500">Don't have an account yet? <Link to="/signup" className="text-indigo-500">Sign up here</Link></p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Your email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Your password" required />
              </div>
            </div>
            {loading && <p className="text-center text-blue-500">Logging in...</p>}
            {successMessage && <p className="text-center text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" disabled={loading}>Login</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
