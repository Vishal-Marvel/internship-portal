import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { AlertCircle, CalendarIcon, CheckCircle2, X } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Internship, Student } from "@/schema";
import { default as ReactSelect } from "react-select";
import axiosInstance from "@/lib/axios";
import { cn } from "@/lib/utils";

interface Props {
    internship: Internship;
}
const formSchema = z.object({
    company_name: z.string().min(1, "Company Name is Required").default(""),
    company_address: z.string().min(1, "Company Address is Required").default(""),
    company_ph_no: z
        .string()
        .min(1, "Company Phone Number is Required")
        .default(""),
    cin_gst_udyog: z.string().min(1, "CIN/GST/UDYOG is Required").default(""),
    cin_gst_udyog_no: z
        .string()
        .min(1, "CIN/GST/UDYOG number is Required")
        .default(""),
    industry_supervisor_name: z
        .string()
        .min(1, "Inturtry Supervisor Name is Required")
        .default(""),
    industry_supervisor_ph_no: z
        .string()
        .min(1, "Inturtry Supervisor Phone Number is Required")
        .default(""),
    industry_supervisor_email: z
        .string()
        .min(1, "Inturtry Supervisor Email is Required")
        .default(""),
    current_cgpa: z
        .string()
        .refine((str) => {
            const num = parseFloat(str);
            return num >= 1 && num <= 10;
        }, "CGPA must be within 1-10")
        .default(""),
    academic_year: z.string().min(1, "Academic year is Required").default(""),
    mode_of_intern: z.string().min(1, "Mode of Intern is Required").default(""),
    no_of_days: z.number().min(1, "Number Of Days is Required").default(null),
    location: z.string().min(1, "Location is Required").default(""),
    domain: z.string().min(1, "Domain is Required").default(""),
    file: z.instanceof(FileList).optional(),
});

///////////////////////////////////////////////////////////


interface Option {
    label: string;
    value: string;
}

const StudentInternship = ({ internship }: Props) => {
    const router = useNavigate();
    const { token, role } = useSession();
    const [years, setYears] = useState<string[]>([]);

    const [skills, setSkills] = useState<Option[]>([]);
    const [image, setImage] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const [update, setUpdate] = useState(false);

    const isLoading = form.formState.isSubmitting || !update;
    const fileRef = form.register("file");
    const isStudent = role && role.includes("student");
    const [imgaeOpen, setImgaeOpen] = useState(false);







    useEffect(() => {
        if (internship) {

            form.setValue("company_name", internship.company_name);
            form.setValue("company_address", internship.company_address);
            form.setValue("company_ph_no", internship.company_ph_no);
            form.setValue("cin_gst_udyog", internship.cin_gst_udyog);
            form.setValue("cin_gst_udyog_no", internship.cin_gst_udyog_no);
            form.setValue("industry_supervisor_name", internship.industry_supervisor_name);
            form.setValue("industry_supervisor_ph_no", internship.industry_supervisor_ph_no);
            form.setValue("industry_supervisor_email", internship.industry_supervisor_email);
            form.setValue("current_cgpa", internship.current_cgpa);
            form.setValue("academic_year", internship.academic_year);
            form.setValue("mode_of_intern", internship.mode_of_intern);
            form.setValue("no_of_days", internship.no_of_days);
            form.setValue("location", internship.location);
            form.setValue("domain", internship.domain);

        }
    }, [internship]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (values.file && values.file[0].size > 1024 * 512) {
                alert("File Size Exceeds 512 kb");
                return;
            }
            const formdata = new FormData();

            formdata.append("company_name", values.company_name);
            formdata.append("company_address", values.company_address);
            formdata.append("company_ph_no", values.company_ph_no);
            formdata.append("cin_gst_udyog", values.cin_gst_udyog);
            formdata.append("cin_gst_udyog_no", values.cin_gst_udyog_no);
            formdata.append("industry_supervisor_name", values.industry_supervisor_name);
            formdata.append("industry_supervisor_ph_no", values.industry_supervisor_ph_no);
            formdata.append("industry_supervisor_email", values.industry_supervisor_email);
            formdata.append("current_cgpa", values.current_cgpa);
            formdata.append("academic_year", values.academic_year);
            formdata.append("mode_of_intern", values.mode_of_intern);
            formdata.append("no_of_days", values.no_of_days.toString());
            formdata.append("location", values.location);
            formdata.append("domain", values.domain);


            const response = await axiosInstance.put(
                "http://localhost:5000/internship/api/v1/students/update",
                formdata,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(response);
            toast(
                <>
                    <CheckCircle2 />
                    <span>{response.data.message}</span>
                </>
            );
            setUpdate(false);
        } catch (error) {
            console.error(error);
            // toast(
            //   <>
            //     <AlertCircle />
            //     {error.response.data.message}
            //   </>
            // );

            // console.error(error.response.data.message);
        }
    };

    return (
        <Card className="h-full w-full shadow-2xl bg-white/80 rounded-2xl">
            <CardHeader>
                <div className="w-full flex justify-between">
                    <CardTitle>Internship Details</CardTitle>
                    <Button
                        variant={update ? "destructive" : "default"}
                        onClick={() => setUpdate(!update)}
                    >
                        {!update ? "Update" : "Close"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="md:h-[550px] h-[500px] max-w-[70vw] bg-white rounded-2xl">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 p-4"
                        >
                            
                                <FormField
                                    name={"company_name"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={isLoading}
                                                    placeholder="Enter Name "
                                                    type="text"
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"company_address"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={true}
                                                    value={field.value}
                                                />
                                                   

                                                
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"company_ph_no"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Phone Number</FormLabel>
                                            <Input
                                                className=" bg-slate-200 shadow-inner"
                                                disabled={true}
                                                placeholder="Enter Student Id"
                                                type="text"
                                                value={field.value}
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"cin_gst_udyog"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type (CIN/GST/UDYOG )</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={isLoading}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className=" bg-slate-200 shadow-inner">
                                                            <SelectValue placeholder="Select Year of Studying" />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="1">CIN</SelectItem>
                                                            <SelectItem value="2">GST</SelectItem>
                                                            <SelectItem value="3">UDYOG</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"cin_gst_udyog_no"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CIN/GST/UDYOG Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={true}
                                                    value={field.value}
                                                />
                                                    
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"industry_supervisor_name"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industry Supervisor Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    type="string"
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={"industry_supervisor_ph_no"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industry Supervisor Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={true}
                                                    value={field.value}
                                                    />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={"industry_supervisor_email"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industry Supervisor Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"current_cgpa"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current CGPA</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"academic_year"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Academic Year</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={isLoading}
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={"mode_of_intern"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mode of Internship</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading || isStudent}
                                    control={form.control}
                                    name="no_of_days"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Number Of Days</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading || isStudent}
                                                    value={field.value}
                                                    defaultValue="unplaced"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={isLoading}
                                    name={"location"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={isLoading}
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={"domain"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Domain</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                            
                                    
                                
                            
                            {update && (
                                <div className="flex flex-col space-y-1.5 pt-2">
                                    <Button type="submit" disabled={isLoading} variant="primary">
                                        Update
                                    </Button>
                                </div>
                            )}
                        </form>
                    </Form>
                    <ScrollBar />
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default StudentInternship;
