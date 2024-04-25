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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
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
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login: FC = () => {
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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">مرحبا بك فى كورساتى</CardTitle>
          <CardDescription>هيا لتكمل رحلتك العملية معنا</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-4">
              <Label className="font-bold" htmlFor="email">
                البريد الألكترونى
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@gmail.com"
                {...register("email")}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div className="grid gap-4">
              <Label className="font-bold" htmlFor="password">
                كلمة المرور
              </Label>
              <Input id="password" type="password" {...register("password")} />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <Button className="w-full">تسجيل الدخول</Button>
          </form>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link href="/register" className="w-full">
            إنشاء حساب
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
