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
import { AlertCircle, CalendarIcon, CheckCircle2 } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Student } from "@/schema";
import { default as ReactSelect } from "react-select";

interface Props {
  student: Student;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is Required").default(""),
  sec_sit: z.string().min(1, "SEC/SIT is Required").default(""),
  student_id: z.string().min(1, "Student ID is Required").default(""),
  batch: z.string().min(1, "Batch is Required").default(""),
  section: z.string().min(1, "Section is Required").default(""),
  year_of_studying: z
    .string()
    .min(1, "Year Of Studying is Required")
    .default(""),
  register_num: z.string().min(1, "Register number is Required").default(""),
  department: z.string().min(1, "Department is Required").default(""),
  email: z.string().email().default(""),
  phone_no: z.string().refine((str) => {
    const phoneRegex = /^\+\d{1,}$/;
    return phoneRegex.test(str);
  }, "Phone Number invalid"),
  total_days_internship: z.string(),
  placement_status: z.string(),
  placed_company: z.string(),
  file: z.instanceof(FileList).optional(),
  mentor_name: z.string(),
  skills: z
    .array(z.string().min(1, "Skills is Required").default(""))
    .min(1, ""),
});

const StudentProfile = ({ student }: Props) => {
  const router = useNavigate();
  const { token, role } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [update, setUpdate] = useState(false);

  const isLoading = form.formState.isSubmitting || !update;
  const fileRef = form.register("file");

  useEffect(() => {
    if (student) {
      form.setValue("name", student.name);
      form.setValue("name", student.name);
      form.setValue("sec_sit", student.sec_sit);
      form.setValue("batch", student.batch);
      form.setValue("section", student.section);
      form.setValue("student_id", student.student_id);
      form.setValue("year_of_studying", student.year_of_studying);
      form.setValue("register_num", student.register_num);
      form.setValue("department", student.department);
      form.setValue("email", student.email);
      form.setValue("phone_no", student.phone_no);
      form.setValue("total_days_internship", student.total_days_internship);
      form.setValue("placement_status", student.placement_status);
      form.setValue("placed_company", student.placed_company);
      form.setValue("mentor_name", student.mentor_name);
      form.setValue("skills", student.skills);
    }
  }, [student]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
        formdata.append(`skills`, skill);
      });
      formdata.append("file", values.file[0]);

      // const response = await axiosInstance.post(
      //   "http://localhost:5000/internship/api/v1/internships/register",
      //   formdata,
      //   {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //   }
      // );
      // toast(
      //   <>
      //     <CheckCircle2 />
      //     <span>{response.data.message}</span>
      //   </>
      // );

      // form.reset();

      // router("/dashboard");
    } catch (error) {
      toast(
        <>
          <AlertCircle />
          {error.response.data.message}
        </>
      );

      console.error(error.response.data.message);
    }
  };

  return (
    <Card className="h-full w-full shadow-2xl bg-white/80 rounded-2xl">
      <CardHeader>
        <div className="w-full flex justify-between">
          <CardTitle>Student Profile</CardTitle>
          <Button onClick={() => setUpdate(!update)}>
            {!update ? "Update" : "Close"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="md:h-[550px] h-[700px] w-full bg-white rounded-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-4"
            >
              <div className=" w-full gap-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-start">
                <FormField
                  disabled={isLoading}
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
                  disabled={isLoading}
                  name={"sec_sit"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEC/SIT</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner"
                          disabled={isLoading}
                          placeholder="SEC/SIT"
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
                  disabled={true}
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
                  disabled={isLoading}
                  name={"year_of_studying"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Of Studying</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner"
                          disabled={isLoading}
                          placeholder={`Enter Year Of Studying`}
                          value={field.value}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  disabled={isLoading}
                  name={"batch"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aacdemic Year</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isLoading}
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
                              <SelectItem value="2024-2025">
                                2024-2025 (current)
                              </SelectItem>
                              <SelectItem value="2023-2024">
                                2023-2024 (previous)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  disabled={true}
                  name={"section"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner"
                          disabled={true}
                          placeholder="Enter Section "
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={isLoading}
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
                  disabled={true}
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
                  disabled={true}
                  control={form.control}
                  name="placement_status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Placement Status</FormLabel>
                      <FormControl>
                        <Select
                          disabled={true}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className=" bg-slate-200 shadow-inner">
                              <SelectValue placeholder="Select PLacement Status" />
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
                  disabled={isLoading}
                  name={"placed_company"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placed Company</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner"
                          disabled={isLoading}
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
                  disabled={true}
                  name={"mentor_name"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mentor Name</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner"
                          disabled={isLoading}
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
                  disabled={isLoading}
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  name={"file"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Offer Letter</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-200 shadow-inner"
                          type="file"
                          placeholder="Insert Offer Letter"
                          accept="type/image"
                          size={1024 * 1024 * 5}
                          {...fileRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default StudentProfile;
