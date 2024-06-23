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
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {


  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/dashboard/home');
    },
  });

  const handleRegisterClick = () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const name = nameRef?.current?.value;
    if(!name || !email || !password) {
      return alert("Please enter name, email and password");
    }

    mutation.mutate({name, email ,password});

  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account <br/>
            {
              mutation.isError && <span className="text-red-500 text-sm">{mutation.error.message}</span>
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">First name</Label>
              <Input ref={nameRef} id="name" placeholder="Name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                ref={emailRef}
                type="email"
                placeholder="john@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input ref={passwordRef} id="password" type="password" placeholder="john@123" />
            </div>
            <Button onClick={handleRegisterClick} className="w-full" disabled={mutation.isPending} >
           {
             mutation.isPending && <LoaderCircle className="animate-spin" />
           }
            <span className="ml-2">Create an account</span>
          </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
