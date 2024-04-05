"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, ConstructionIcon } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { useEffect, useState } from "react";
import ResetPassword from "@/components/ResetPassword";
import PasswordInput from "@/components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { useTheme } from "@/providers/theme-provider";

import { cn } from "@/lib/utils";

const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    otp: z.string().min(1, { message: "OTP is required" }),
    NPass: z.string().min(1, { message: "Password is required" }),
    ConfNPass: z.string().min(1, { message: "Confirm Password to Continue" }),
    
});

const forgetPassword = () => {
    const router = useNavigate();
    const { setTheme } = useTheme();

    const { setSession } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            otp: "",
            NPass: "",
            ConfNPass:""
        },
    });
    const isLoading = form.formState.isSubmitting;
    const [OTPShown, setOTPShown] = useState(false);

    useEffect(() => {
      if (form.getValues("email") && form.getValues("email").length >= 0)
        form.setValue("email", form.getValues("email").toUpperCase());
    }, [form.watch("email")]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axiosInstance.post(
                "http://localhost:5000/internship/api/v1/forgetpass",
                { email: values.email + "@sairamtap.edu.in" }
            );
            setSession(response.data.data.token, response.data.data.roles);
            setTheme(response.data.data.clg);
            form.reset();

            router("/dashboard");
        } catch (error: any) {
            const errorMessage = await error.response.data;

            toast(
                <>
                    <AlertCircle /> {errorMessage.message}
                </>
            );
        }
    };

    return (
        <Card className="shadow-2xl bg-white/100 rounded-2xl">
            <CardHeader>
                <CardTitle>Forget Password</CardTitle>
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
                                        <FormLabel>Enter the email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className=" bg-slate-300 shadow-inner"
                                                disabled={isLoading}
                                                placeholder="Email"
                                                type="email"
                                                {...field}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <div className="flex flex-row items-center justify-center w-full gap-2 ">
                            <Button  disabled={isLoading} variant="primary">
                                Send OTP
                            </Button>
                        {/* </div>
                        <div className="flex flex-col items-center w-full gap-2 "> */}
                            <Button  disabled={isLoading} variant="primary">
                                Resend OTP
                            </Button>
                        </div>

                        
                        <div className="grid w-full items-center gap-10 ">
                        <FormField
                            disabled={isLoading}
                            name={"otp"}
                            control={form.control}
                            render={({ field }) => (
                        
                                <FormItem>
                                    <FormLabel>Enter OTP</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6}
                                            className=" bg-slate-300 shadow-inner"
                                            disabled={isLoading}
                                            {...field}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            {/* </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup> */}
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>


                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <div className="grid w-full items-center gap-10 ">

                            <FormField
                                disabled={isLoading}
                                name={"NPass"}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
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
                        <div className="grid w-full items-center gap-10 ">

                            <FormField
                                disabled={isLoading}
                                name={"ConfNPass"}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
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
                        <div className="grid w-full items-center gap-10 ">
                            <Button  disabled={isLoading} variant="primary">
                                Reset Password
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            {/* <ResetPassword/> */}
            
        </Card>
    );
};

export default forgetPassword;
