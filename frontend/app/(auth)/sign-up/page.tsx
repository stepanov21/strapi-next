"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { INewUser, registerUserAction } from "@/data/action/auth-action";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import ErrorToast from "@/components/custom/ErrorToast";

const SignUp = () => {
  const [state, action] = useFormState(registerUserAction, {
    data: null,
    zodErrors: null,
    message: null,
  });
  console.log(state, "client");

  return (
    <form action={action}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Регистрация</CardTitle>
          <CardDescription className="text-center">
            Или уже есть аккаунт ?
            <Link href={"/login"} className="underline text-gray-800">
              Войти
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2.5">
              <Input name="username" placeholder="Придумай логин" />
              <Input name="email" placeholder="Твой мейл" />
              <Input
                name="password"
                type="password"
                placeholder="Придумай пароль"
              />
              <Input
                name="repeatPassword"
                type="password"
                placeholder="Повтори пароль"
              />
            </div>
            <ErrorToast errorFields={state.zodErrors} message={state.message}/>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" className="w-full">
            Зарегистрироваться
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUp;
