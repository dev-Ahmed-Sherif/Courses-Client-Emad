"use client";

import type { FC } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

type FormValues = {
  email: string;
  password: string;
};

const FormSchema = z.object({
  // @deprecated Use z.string().min(1) instead.
  // username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email Address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Register: FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // const onSubmit = (data: FormValues) => {
  //   console.log(data);
  // };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      // title: "You submitted the following values:",
      description:
        // <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //   <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        // </pre>
        "تم تسجيل الدخول بنجاح",
      variant: "success",
    });
  };

  return (
    <div className="my-14 w-screen flex items-center justify-center">
      <Card className="w-11/12 max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-center flex-col gap-2">
            <p className="text-2xl">مرحبا بك فى كورساتى</p>
            <p className="text-lg">هيا لتبدأ رحلتك العملية معنا</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الألكترونى</FormLabel>
                    <FormControl>
                      <Input placeholder="m@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-center justify-center">
                <Button className="w-2/3" type="submit">
                  إنشاء حساب
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-center gap-2 font-bold">
          <p> هل لديك حساب ؟ </p>
          <Link className="underline underline-offset-4" href="/login">
            تسجيل الدخول
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
