import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { axiosInstance } from "@/constants/axiosInstance";
import toast from "react-hot-toast";

const formSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  treatmentType: z.string().min(1, "Treatment type is required"),
  insurancePlan: z.string().min(1, "Insurance plan is required"),
  dateOfService: z.date({
    required_error: "Date of service is required",
  }),
  diagnosisCode: z.string().min(1, "Diagnosis code is required"),
  doctorNotes: z
    .string()
    .max(500, "Notes must not exceed 500 characters")
    .optional(),
});
type FormValues = z.infer<typeof formSchema>;

interface AuthRequestFormProps {
  patientId?: string;
  onSubmit?: (data: FormValues) => void;
}
export default function AuthRequestForm({
  patientId,
  onSubmit,
}: AuthRequestFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: patientId || "",
    },
  });

  async function handleSubmit(values: FormValues) {
    try {
      console.log("values:", values);
      const { data } = await axiosInstance.post("/auth-request", values);
      console.log("data", data);
      if (data.success) {
        toast.success("pre autherization request send succfully");
      } else {
        toast.error(data.message);
      }
      onSubmit?.(values);
    } catch (error) {
      console.error("Error adding task", error);
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-2xl p-8 bg-gray-100 rounded-lg shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter patient ID" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter treatment type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insurancePlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Plan</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter insurance plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfService"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Service</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diagnosisCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter diagnosis code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doctorNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes (max 500 characters)"
                      className="resize-none"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("doctorNotes");
                      }}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>{field.value?.length || 0}/500 characters</span>
                    <FormMessage />
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
