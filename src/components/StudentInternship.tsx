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
import { Student } from "@/schema";
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
    starting_date: z.date(),
    no_of_days: z.string().min(1, "Number Of Days is Required").default(""),
    location: z.string().min(1, "Location is Required").default(""),
    domain: z.string().min(1, "Domain is Required").default(""),
    file: z.instanceof(FileList).optional(),
});

///////////////////////////////////////////////////////////


interface Option {
    label: string;
    value: string;
}

const StudentInternship = ({ student }: Props) => {
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
        if (student) {
            
    form.setValue("company_name", student.company_name);
    form.setValue("company_address", student.company_address);
    form.setValue("company_ph_no", student.company_ph_no);
    form.setValue("cin_gst_udyog", student.cin_gst_udyog);
    form.setValue("cin_gst_udyog_no", student.cin_gst_udyog_no);
    form.setValue("industry_supervisor_name", student.industry_supervisor_name);
    form.setValue("industry_supervisor_ph_no", student.industry_supervisor_ph_no);
    form.setValue("industry_supervisor_email", student.industry_supervisor_email);
    form.setValue("current_cgpa", student.current_cgpa);
    form.setValue("academic_year", student.academic_year);
    form.setValue("mode_of_intern", student.mode_of_intern);
    form.setValue("starting_date", student.starting_date);
    form.setValue("no_of_days", student.no_of_days);
    form.setValue("location", student.location);
    form.setValue("domain", student.domain);
    if (student.file) {
        form.setValue("file", student.file);
    }
        }
    }, [student]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (values.file && values.file[0].size > 1024 * 512) {
                alert("File Size Exceeds 512 kb");
                return;
            }
            const formdata = new FormData();

            formdata.append("name", values.name);
            formdata.append("section", values.section);
            formdata.append("batch", values.batch);
            formdata.append("student_id", values.student_id);
            formdata.append("year_of_studying", values.year_of_studying);
            formdata.append("register_num", values.register_num);
            formdata.append("department", values.department);
            formdata.append("email", values.email);
            formdata.append("phone_no", values.phone_no);
            formdata.append("total_days_internship", values.total_days_internship);
            formdata.append("placement_status", values.placement_status);
            formdata.append("placed_company", values.placed_company);
            formdata.append("mentor_name", values.mentor_name);
            values.skills.forEach((skill, index) => {
                formdata.append(`skills`, skill.value);
            });
            if (values.file) {
                formdata.append("file", values.file[0]);
            }

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
                    <CardTitle>Student Profile</CardTitle>
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
                            <div className=" w-full gap-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start">
                                <div
                                    className={cn(
                                        "flex flex-col w-full items-center space-y-6 col-span-3",
                                        update && "hidden"
                                    )}
                                >
                                    <FormLabel> Profile Photo</FormLabel>

                                    <img
                                        src={"data:image/jpg;charset=utf-8;base64," + image}
                                        height={100}
                                        width={100}
                                    />
                                </div>
                                <FormField
                                    name={"name"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
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
                                    name={"sec_sit"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SEC/SIT</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={true}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className=" bg-slate-200 shadow-inner">
                                                            <SelectValue placeholder="Select College" />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="sec">SEC</SelectItem>
                                                            <SelectItem value="sit">SIT</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"student_id"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Student Id</FormLabel>
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
                                    name={"year_of_studying"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year Of Studying</FormLabel>
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
                                                            <SelectItem value="1">I</SelectItem>
                                                            <SelectItem value="2">II</SelectItem>
                                                            <SelectItem value="3">III</SelectItem>
                                                            <SelectItem value="4">IV</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"batch"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Batch</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={true}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className=" bg-slate-200 shadow-inner">
                                                            <SelectValue placeholder="Select Academic Year" />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {years &&
                                                                years.map((year, index) => (
                                                                    <SelectItem value={year} key={index}>
                                                                        {year}
                                                                    </SelectItem>
                                                                ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"register_num"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Register Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    placeholder="Enter Register Number"
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
                                    name={"department"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Department</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={true}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className=" bg-slate-200 shadow-inner">
                                                            <SelectValue placeholder="Select Department" />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="cse">CSE</SelectItem>
                                                            <SelectItem value="it">IT</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={"section"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={isLoading}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className=" bg-slate-200 shadow-inner">
                                                            <SelectValue placeholder="Select Section" />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="A">A</SelectItem>
                                                            <SelectItem value="B">B</SelectItem>
                                                            <SelectItem value="C">C</SelectItem>
                                                            <SelectItem value="D">D</SelectItem>
                                                            <SelectItem value="E">E</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"email"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    placeholder="Enter Email "
                                                    type="email"
                                                    value={field.value}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name={"phone_no"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={isLoading}
                                                    placeholder="Enter Phone Number"
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
                                    name={"total_days_internship"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Total Days Of Internship</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    placeholder="Total Days Of Internship"
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
                                    disabled={isLoading || isStudent}
                                    control={form.control}
                                    name="placement_status"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Placement Status</FormLabel>
                                            <FormControl>
                                                <Select
                                                    disabled={isLoading || isStudent}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    defaultValue="unplaced"
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className=" bg-slate-200 shadow-inner">
                                                            <SelectValue placeholder="Select Placement Status" />
                                                        </SelectTrigger>
                                                    </FormControl>

                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="placed">Placed</SelectItem>
                                                            <SelectItem value="unplaced">Unplaced</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    disabled={isLoading || isStudent}
                                    name={"placed_company"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Placed Company</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={isLoading || isStudent}
                                                    placeholder="Enter Placed Company"
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
                                    name={"mentor_name"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mentor Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=" bg-slate-200 shadow-inner"
                                                    disabled={true}
                                                    placeholder="Enter Mentor Name "
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
                                    name={"skills"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Skills</FormLabel>
                                            <FormControl>
                                                <ReactSelect
                                                    isMulti
                                                    isDisabled={isLoading}
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    // defaultValue={skills[0]}
                                                    value={field.value}
                                                    options={skills}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name={"file"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className={!update && "hidden"}>
                                            <FormLabel>Profile Photo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="bg-slate-200 shadow-inner"
                                                    type="file"
                                                    placeholder="Insert Profile Photo"
                                                    accept="image/*"
                                                    {...fileRef}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                <span
                                                    className={cn(
                                                        " text-blue-400 hover:underline cursor-pointer",
                                                        imgaeOpen && "hidden"
                                                    )}
                                                    onClick={() => setImgaeOpen(true)}
                                                >
                                                    Click To {!imgaeOpen ? "View" : "Close"}
                                                </span>
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    className={cn(
                                        "w-full justify-center items-center",
                                        imgaeOpen ? "flex" : "hidden"
                                    )}
                                >
                                    <div className="relative flex">
                                        <X
                                            className="cursor-pointer -right-3 -top-3 absolute"
                                            onClick={() => setImgaeOpen(false)}
                                        />
                                        <img
                                            className={cn(" text-blue-500 hover:underline right-1/2")}
                                            src={"data:image/jpg;charset=utf-8;base64," + image}
                                            height={100}
                                            width={100}
                                        />
                                    </div>
                                </div>
                            </div>
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
