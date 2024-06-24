import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import useToken from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const setToken = useToken((store) => store.setToken);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.accessToken);
      navigate('/dashboard/home');
    },
  });

  const handleLoginClick = () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if(!email || !password) {
      return alert("Please enter email and password");
    }

    mutation.mutate({email ,password});

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.<br/>
            {
              mutation.isError && <span className="text-red-500 text-sm">{mutation.error.message}</span>
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="john@gmail.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="john@123"
              required
            />
          </div>
          <Button onClick={handleLoginClick} className="w-full" disabled={mutation.isPending} >
           {
             mutation.isPending && <LoaderCircle className="animate-spin" />
           }
            <span className="ml-2">Sign in</span>
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/auth/register"} className="underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
