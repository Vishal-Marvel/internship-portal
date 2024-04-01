"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { useTheme } from "@/providers/theme-provider";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const StudentSignIn = () => {
  const router = useNavigate();
  const { setTheme } = useTheme();

  const { setSession } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/internship/api/v1/students/login",
        { email: values.email + "@sairamtap.edu.in", password: values.password }
      );
      setSession(response.data.data.token, response.data.data.roles);
      setTheme(response.data.data.clg);
      form.reset();

      router("/dashboard");
    } catch (error: any) {
      const errorMessage: String = error.response.data;
      if (errorMessage.includes("User"))
        form.setError("email", { message: error.response.data });
      if (errorMessage.includes("Password"))
        form.setError("password", { message: error.response.data });

      console.error(error);
    }
  };

  return (
    <Card className=" shadow-2xl bg-white/100 rounded-2xl">
      <CardHeader>
        <CardTitle>Student Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid w-full items-center gap-10 ">
              <FormField
                disabled={isLoading}
                name={"email"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Id</FormLabel>
                    <FormControl>
                      <span className="flex items-center gap-5">
                        <Input
                          className=" bg-slate-300 shadow-inner"
                          disabled={isLoading}
                          placeholder="Username"
                          type="text"
                          {...field}
                        />
                        @sairamtap.edu.in
                      </span>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                name={"password"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        className=" bg-slate-300 shadow-inner"
                        disabled={isLoading}
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5 pt-2">
              <Button type="submit" disabled={isLoading} variant="primary">
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentSignIn;
