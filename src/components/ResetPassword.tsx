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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AlertCircle, ConstructionIcon } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { useEffect, useState } from "react";
import PasswordInput from "./PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { useTheme } from "@/providers/theme-provider";

const formSchema = z.object({
    otp: z.string().min(1, { message: "OTP is required" }),
    NPass: z.string().min(1, { message: "Password is required" }),
    ConfNPass: z.string().min(1, { message: "Confirm Password to continue" }),
});

const ResetPassword = () => {
    const router = useNavigate();
    const { setTheme } = useTheme();

    const { setSession } = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            otp: "",
            NPass: "",
            ConfNPass: "",
        },
    });
    const isLoading = form.formState.isSubmitting;

    // useEffect(() => {
    //     if (form.getValues("email") && form.getValues("email").length >= 0)
    //         form.setValue("email", form.getValues("email").toUpperCase());
    // }, [form.watch("email")]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axiosInstance.post(
                "http://localhost:5000/internship/api/v1/forgetpass",
                { NPass: values.NPass, ConfNPass: values.ConfNPass }
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
        <Card>
            
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    


                    </form>
                </Form>

            </CardContent>
            <CardFooter>
                <div className="flex flex-col items-center w-full justify-center gap-3">
                    Haven't Signed up yet? <Link to={"/student/signin"}><Button variant="primary" className="p-2">Sign in</Button></Link>
                </div>
                <div className="flex flex-col items-center w-full justify-center gap-3">
                    Forgot password? <Link to={"/forgetpass"}><Button variant="primary" className="p-2">Click here</Button></Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ResetPassword;
