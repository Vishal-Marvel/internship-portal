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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CalendarIcon, CheckCircle2, Download, X } from "lucide-react";
import { useSession } from "@/providers/context/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { ApprovalStatus, FileType, Internship, Student } from "@/schema";
import axiosInstance from "@/lib/axios";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import Approval from "./Approval";
import { useSocket } from "@/hooks/use-socket";
import { useModal } from "@/hooks/use-model-store";

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

  no_of_days: z.number().min(1, "Number Of Days is Required").default(null),
  location: z.string().min(1, "Location is Required").default(""),
  domain: z.string().min(1, "Domain is Required").default(""),
  offer_letter: z.instanceof(FileList).optional(),
  certificate: z.instanceof(FileList).optional(),
});

const StudentInternship = ({ internship }: Props) => {
  const { token, role } = useSession();
  const { type, onClose } = useSocket();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [update, setUpdate] = useState(false);
  const [cin_gst_udyog, setcin_gst_udyog] = useState<string>();
  const [years, setYears] = useState<string[]>([]);
  const [approval, setApproval] = useState<ApprovalStatus>();
  const [approvalStatus, setApprovalStatus] = useState(false);
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const startYear = currentMonth >= 6 ? currentYear : currentYear - 1;
    const endYear = startYear + 1;

    const financialYear = `${startYear}-${endYear}`;

    setYears([financialYear]);
  }, []);
  const isStudent = role && role.includes("student");
  const isRejected = internship?.internship_status == "Rejected";
  const isLoading =
    form.formState.isSubmitting || isStudent || !update || isRejected;
  const offer_letterRef = form.register("offer_letter");
  const certificateRef = form.register("certificate");
  const [offer_letter, setOffer_letter] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [postCompletion, setPostCompletion] = useState(false);
  const [report, setReport] = useState(null);
  const { onOpen } = useModal();

  useEffect(() => {
    if (internship) {
      getFiles();
      getApproval();
      form.setValue("company_name", internship.company_name);
      form.setValue("company_address", internship.company_address);
      form.setValue("company_ph_no", internship.company_ph_no);
      form.setValue("cin_gst_udyog", internship.cin_gst_udyog);
      form.setValue("cin_gst_udyog_no", internship.cin_gst_udyog_no);
      form.setValue(
        "industry_supervisor_name",
        internship.industry_supervisor_name
      );
      form.setValue(
        "industry_supervisor_ph_no",
        internship.industry_supervisor_ph_no
      );
      form.setValue(
        "industry_supervisor_email",
        internship.industry_supervisor_email
      );
      form.setValue("current_cgpa", internship.current_cgpa);
      form.setValue("academic_year", internship.academic_year);
      form.setValue("mode_of_intern", internship.mode_of_intern);
      form.setValue("starting_date", internship.starting_date);
      const noOfDays = internship.no_of_days;
      const doubledValue =
        internship.mode_of_intern == "Online" ? noOfDays * 2 : noOfDays;

      const nearestValue = ["15", "30", "45"].reduce((prev, curr) => {
        const currValue = parseInt(curr);
        return Math.abs(currValue - doubledValue) <
          Math.abs(prev - doubledValue)
          ? currValue
          : prev;
      }, parseInt(["15", "30", "45"][0]));
      form.setValue("no_of_days", nearestValue);
      form.setValue("location", internship.location);
      form.setValue("domain", internship.domain);

      const endingDate = new Date(internship.ending_date);
      const today = new Date();
      if (internship.approval_status == "Approved" && endingDate < today) {
        setPostCompletion(true);
      }
    }
  }, [internship, type]);

  const getFiles = async () => {
    if (internship.offer_letter) {
      const response = await axiosInstance.get(
        "http://localhost:5000/internship/api/v1/internships/download-file/" +
          internship.offer_letter,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setOffer_letter(url);
    }
    if (internship.certificate) {
      const response = await axiosInstance.get(
        "http://localhost:5000/internship/api/v1/internships/download-file/" +
          internship.certificate,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
          responseType: "arraybuffer",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setCertificate(url);
    }
    const response = await axiosInstance.get(
      "http://localhost:5000/internship/api/v1/internships/download-report/" +
        internship.id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        responseType: "arraybuffer",
      }
    );
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    setReport(url);
  };

  const getApproval = async () => {
    if (!type || type == "approval") {
      const response = await axiosInstance.get(
        "http://localhost:5000/internship/api/v1/internships/approval-status/" +
          internship.id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setApproval(response.data.data.approval_status);
      onClose();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.offer_letter[0]?.size > 1024 * 512) {
        onOpen("alert", {alertText: "Offer letter File Size Exceeds 512 kb"});

        return;
      }
      if (values.certificate[0]?.size > 1024 * 512) {
        onOpen("alert", {alertText: "Certificate  File Size Exceeds 512 kb"});

        return;
      }
      const formdata = new FormData();

      formdata.append("company_name", values.company_name);
      formdata.append("company_address", values.company_address);
      formdata.append("company_ph_no", values.company_ph_no);
      formdata.append("cin_gst_udyog", values.cin_gst_udyog);
      formdata.append("cin_gst_udyog_no", values.cin_gst_udyog_no);
      formdata.append(
        "industry_supervisor_name",
        values.industry_supervisor_name
      );
      formdata.append(
        "industry_supervisor_ph_no",
        values.industry_supervisor_ph_no
      );
      formdata.append(
        "industry_supervisor_email",
        values.industry_supervisor_email
      );
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
        <div className="w-full flex justify-between items-center">
          <CardTitle>Internship Details</CardTitle>
          <div className="flex item-center gap-4">
            {!isStudent && !isRejected && (
              <Button
                variant={update ? "destructive" : "default"}
                onClick={() => setUpdate(!update)}
              >
                {!update ? "Update" : "Close"}
              </Button>
            )}
            {report && (
              <Link
                className="hover:underline text-blue-400"
                to={report}
                download={`${internship.company_name}_report.pdf`}
                target="_blank"
              >
                <Button variant="primary">
                  <Download className="mr-2 h-5 w-5" /> Report
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="md:h-[70vh] h-[700px] w-full bg-white rounded-2xl">
          <Form {...form}>
            <form
              onSubmit={(e) => !update && form.handleSubmit(onSubmit)}
              className="space-y-8 p-4"
            >
              <div className=" w-full gap-8 flex flex-col items-start">
                <div className="gap-4 flex flex-col w-full">
                  <div
                    className={cn(
                      "grid grid-cols-1 gap-8 md:pl-3 items-start",
                      approval?.comments ? "md:grid-cols-3" : "md:grid-cols-2"
                    )}
                  >
                    <FormItem>
                      <FormLabel>Approval Status</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner font-semibold"
                          disabled={isLoading}
                          type="text"
                          value={internship?.approval_status}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Internship Status</FormLabel>
                      <FormControl>
                        <Input
                          className=" bg-slate-200 shadow-inner font-semibold"
                          disabled={isLoading}
                          type="text"
                          value={internship?.internship_status}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {approval?.comments && (
                      <FormItem>
                        <FormLabel>Comments</FormLabel>
                        <FormControl>
                          <Input
                            className=" bg-slate-200 shadow-inner font-semibold"
                            disabled={isLoading}
                            type="text"
                            value={approval?.comments}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  </div>
                </div>
                <div className="gap-4 flex flex-col w-full">
                  <span className="text-xl font-semibold">Company Details</span>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-8 md:pl-3 items-center">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                      <FormField
                        disabled={isLoading}
                        name={"company_name"}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input
                                className=" bg-slate-200 shadow-inner"
                                disabled={isLoading}
                                placeholder="Enter Company Name "
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        disabled={isLoading}
                        name={"company_ph_no"}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                className=" bg-slate-200 shadow-inner"
                                disabled={isLoading}
                                placeholder="Enter Company Phone Number"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        disabled={isLoading}
                        name={"cin_gst_udyog"}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CIN/GST/UDYOG</FormLabel>
                            <Select
                              disabled={isLoading}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className=" bg-slate-200 shadow-inner">
                                <SelectValue placeholder="Select CIN/GST/UDYOG" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="cin">CIN</SelectItem>
                                  <SelectItem value="gst">GST</SelectItem>
                                  <SelectItem value="udyog">UDYOG</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        disabled={isLoading}
                        name={"cin_gst_udyog_no"}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase">
                              {cin_gst_udyog ? cin_gst_udyog : "CIN/GST/UDYOG"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                className=" bg-slate-200 shadow-inner"
                                disabled={isLoading}
                                placeholder={`Enter ${
                                  (cin_gst_udyog &&
                                    cin_gst_udyog.toUpperCase()) ||
                                  "CIN/GST/UDYOG"
                                } Number`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      disabled={isLoading}
                      name={"company_address"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Address</FormLabel>
                          <FormControl>
                            <Textarea
                              className=" bg-slate-200 shadow-inner lg:min-h-[150px] lg:max-h-[150px] md:min-h-[300px] md:max-h-[300px]  min-h-[100px] max-h-[100px]"
                              disabled={isLoading}
                              placeholder="Enter Company Address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="gap-4 flex flex-col w-full">
                  <span className="text-xl font-semibold">
                    Industry Supervisor Details
                  </span>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:pl-3 items-center">
                    <FormField
                      disabled={isLoading}
                      name={"industry_supervisor_name"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry Supervisor Name</FormLabel>
                          <FormControl>
                            <Input
                              className=" bg-slate-200 shadow-inner"
                              disabled={isLoading}
                              placeholder="Enter Industry Supervisor Name "
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      disabled={isLoading}
                      name={"industry_supervisor_ph_no"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry Supervisor Number</FormLabel>
                          <FormControl>
                            <Input
                              className=" bg-slate-200 shadow-inner"
                              disabled={isLoading}
                              placeholder="Enter Industry Supervisor Number"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={isLoading}
                      name={"industry_supervisor_email"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel> Industry Supervisor Email</FormLabel>
                          <FormControl>
                            <Input
                              className=" bg-slate-200 shadow-inner"
                              disabled={isLoading}
                              placeholder="Enter Industry Supervisor Email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="gap-4 flex flex-col w-full">
                  <span className="text-xl font-semibold">
                    Academic & Internship Details
                  </span>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:pl-3 items-start">
                    <FormField
                      disabled={isLoading}
                      name={"current_cgpa"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current CGPA</FormLabel>
                          <FormControl>
                            <Input
                              className=" bg-slate-200 shadow-inner"
                              disabled={isLoading}
                              placeholder="Enter Current CGPA "
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      disabled={isLoading}
                      name={"academic_year"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic Year</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isLoading}
                              value={field.value}
                              onValueChange={field.onChange}
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
                      disabled={isLoading}
                      name={"mode_of_intern"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mode Of Intern</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isLoading}
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className=" bg-slate-200 shadow-inner">
                                  <SelectValue placeholder="Select Mode of Intern" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="online">Online</SelectItem>
                                  <SelectItem value="offline">
                                    Offline
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
                      disabled={isLoading}
                      control={form.control}
                      name="starting_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Starting Date</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild disabled={isLoading}>
                                <FormControl>
                                  <Button
                                    disabled={isLoading}
                                    variant={"outline"}
                                    className={cn(
                                      "text-left font-normal bg-slate-200 shadow-inner",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      // new Date(field.value).toLocaleDateString("en-GB")
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    const today = new Date();
                                    const futureDate = new Date(today);
                                    futureDate.setDate(today.getDate() + 45);
                                    const pastDate = new Date(today);
                                    pastDate.setDate(today.getDate() - 15);
                                    return date > futureDate || date < pastDate;
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      disabled={isLoading}
                      name={"no_of_days"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Days</FormLabel>
                          <FormControl>
                            <Select
                              disabled={isLoading}
                              value={
                                ["15", "30", "45"].includes(String(field.value))
                                  ? String(field.value)
                                  : String(field.value * 2)
                              }
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className=" bg-slate-200 shadow-inner">
                                  <SelectValue placeholder="Select Number of Days" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="15">15</SelectItem>
                                  <SelectItem value="30">30</SelectItem>
                                  <SelectItem value="45">45</SelectItem>
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
                      name={"location"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              className=" bg-slate-200 shadow-inner"
                              disabled={isLoading}
                              placeholder="Enter Location "
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={isLoading}
                      name={"domain"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Domain</FormLabel>
                          <FormControl>
                            <Input
                              className=" bg-slate-200 shadow-inner"
                              disabled={isLoading}
                              placeholder="Enter Domain "
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={isLoading}
                      name={"offer_letter"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Offer Letter</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-slate-200 shadow-inner"
                              type="file"
                              placeholder="Insert Offer Letter"
                              accept=".pdf"
                              size={1024 * 1024 * 5}
                              {...offer_letterRef}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            {offer_letter && (
                              <Link
                                className="hover:underline text-blue-400"
                                to={offer_letter}
                                download={`${internship.company_name}_offerletter.pdf`}
                                target="_blank"
                              >
                                click to download
                              </Link>
                            )}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {update && (
                <div className="flex flex-1 w-full space-y-1.5 pt-2">
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isLoading}
                    variant="primary"
                  >
                    Update Internship
                  </Button>
                </div>
              )}
              <div className="gap-4 flex flex-col w-full">
                <span className="text-xl font-semibold">
                  Faculty Wise Approval Status{" "}
                  <span
                    onClick={() => setApprovalStatus(!approvalStatus)}
                    className="text-blue-500 text-sm font-normal hover:underline cursor-pointer"
                  >
                    (Click to {approvalStatus ? "Close" : "View"})
                  </span>
                </span>
                <div
                  className={cn(
                    !approvalStatus && "max-h-[0px] overflow-hidden"
                  )}
                >
                  <div className="grid grid-cols-1 gap-8 md:pl-3 items-start ">
                    <Approval
                      approval={approval}
                      role={role}
                      id={internship?.id}
                      rejected={isRejected}
                    />
                  </div>
                </div>
              </div>
              {postCompletion && (
                <div className="gap-4 flex flex-col w-full">
                  <span className="text-xl font-semibold">Post Completion</span>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:pl-3 items-start ">
                    <FormField
                      disabled={isLoading}
                      name={"certificate"}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificate</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              className="bg-slate-200 shadow-inner"
                              type="file"
                              placeholder="Insert Offer Letter"
                              accept=".pdf"
                              size={1024 * 1024 * 5}
                              {...certificateRef}
                            />
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            {certificate && (
                              <Link
                                className="hover:underline text-blue-400"
                                to={certificate}
                                download={`${internship.company_name}_certificate.pdf`}
                                target="_blank"
                              >
                                click to view
                              </Link>
                            )}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
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
