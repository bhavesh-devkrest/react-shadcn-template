"use client";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateTimePicker } from "@/components/datetime-picker";

type DemoFormValues = {
  date_of_birth: string;
};

export default function DateTimePickerDemo() {
  const form = useForm<DemoFormValues>({
    defaultValues: {
      date_of_birth: "",
    },
  });

  function onSubmit(values: DemoFormValues) {
    // eslint-disable-next-line no-console
    console.log("Submitted:", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DateTimePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) =>
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                  }
                  hideTime={true}
                  disabled={false}
                  min={new Date("1900-01-01")}
                  max={new Date()}
                  clearable={true}
                  classNames={{
                    trigger: "w-full h-10",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
