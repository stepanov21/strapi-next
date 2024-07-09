"use server";

import { loginUser, registerNewUser } from "@/data/services/auth-service";
import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { IJobState } from "@/components/custom/AddJobItem";

export interface INewUser {
  username: string;
  email: string;
  password: string;
}

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z
  .object({
    username: z.string().min(3).max(20, {
      message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
    repeatPassword: z.string().min(6).max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
  });

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error?.flatten().fieldErrors,
      strapiErrors: null,
      message: "Ошибка заполнения полей",
    };
  }

  const res = await registerNewUser(validatedFields.data);
  if (!res) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      message: "Что-то пошло не так :(",
    };
  }
  if (res.error) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: res.error,
      message: "Ошибка регистрации",
    };
  }
  cookies().set("jwt", res.jwt, config);
  redirect("dashboard");
}
export async function loginUserAction(prevState: any, formData: FormData) {
  const res = await loginUser({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });
  if (!res) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Что-то пошло не так :(",
    };
  }
  if (res.error) {
    return {
      ...prevState,
      strapiErrors: res.error,
      message: `Ошибка регистрации ${res.error}`,
    };
  }
  cookies().set("jwt", res.jwt, config);
  redirect("dashboard");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("login");
}
