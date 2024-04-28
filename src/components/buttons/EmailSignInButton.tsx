"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInEmailSchema } from "@/validators/email";

type EmailInput = z.infer<typeof signInEmailSchema>;

const EmailSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { toast } = useToast();

  const form = useForm<EmailInput>({
    resolver: zodResolver(signInEmailSchema),
  });

  async function SignInWithEmail(data: EmailInput) {
    const signInResult = await signIn("email", {
      email: data.email,
      callbackUrl: callbackUrl,
      redirect: false,
    });

    if (!signInResult?.ok) {
      toast({
        title: "Error",
        description: signInResult?.error,
        variant: "destructive",
      });
    }
    return toast({
      title: "Проверьте ваш почтовый ящик:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md">
          <code className="text-primary">{data.email}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(SignInWithEmail)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Войдите используя свой Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    className="h-auto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          variant="outline"
          color="gray"
          className="mt-3 w-full"
        >
          Продолжить через Email
        </Button>
      </form>
    </Form>
  );
};

export default EmailSignInButton;
