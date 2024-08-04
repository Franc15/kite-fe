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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { register } from "@/services/apiService";

export function Signup() {
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();  // Hook for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await register(data);
      setSuccessMessage("Registration successful!");
      console.log(response);

      // Clear the form fields
      event.target.reset();

      // Redirect to login page after a short delay to let users see the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Adjust the delay as needed
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Company Registration</CardTitle>
            <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-indigo-500">Login</Link></p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="col-span-1">
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="name" type="text" placeholder="Enter company name" required />
                    
                    <Label htmlFor="email">Email</Label>
                    <Input id="companyEmail" type="email" name="email" placeholder="Enter company email" required />
                    
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password" placeholder="Enter password" required />

                  </div>
                </div>

                {/* Right Column */}
                <div className="col-span-1">
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" type="text" name="address" placeholder="Enter address" required />

                    <Label htmlFor="businessType">Type of Business</Label>
                    <Select name="role">
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="manufacturer">Manufacturer</SelectItem>
                        <SelectItem value="supplier">Supplier</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>

                    <Label htmlFor="eth_address">Ethereum Address</Label>
                    <Input id="eth_address" type="text" name="eth_address" placeholder="Enter Ethereum address" required />

                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={loading}>Register</Button>
              </CardFooter>
            </form>
            {loading && <p className="text-center text-blue-500">Submitting...</p>}
            {successMessage && <p className="text-center text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
          </CardContent>
          <p className="text-sm text-gray-500 text-center p-4">
            By registering, you agree to our <a href="#" className="text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-500">Privacy Policy</a>.
          </p>
        </Card>
      </div>
    </div>
  );
}
