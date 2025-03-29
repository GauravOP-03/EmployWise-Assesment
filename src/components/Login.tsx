import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // to store form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // controlled input 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit function 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`https://reqres.in/api/login`, formData)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        // console.log(res);
        setError(null);
        navigate("/users");
        setLoading(false)
        const toastId = toast("Logged in successfully", {
          action: {
            label: "Dismiss",
            onClick: () => toast.dismiss(toastId),
          },
        })
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
          setError(error.response.data.error); // Display the error message
          const toastId = toast.error(error.response.data.error, {
            action: {
              label: "Dismiss",
              onClick: () => toast.dismiss(toastId),
            },
          });
        } else {
          console.error("Unexpected Error:", error.message);
          setError(error.message);
          toast(error.message);
        }
        setLoading(false)
      })


  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <Card className="w-96 shadow-lg">
        <CardHeader className="text-center text-lg font-semibold">
          Login
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-center font-semibold mt-2">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
