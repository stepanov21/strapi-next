'use server'

import {registerNewUser} from "@/data/services/auth-service";
import {z} from "zod";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export interface INewUser {
    username: string;
    email: string;
    password: string
}

const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
    username: z.string().min(3).max(20, {
        message: "Username must be between 3 and 20 characters",
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be between 6 and 100 characters",
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

export async function registerUserAction(prevState, formData: FormData) {

    const validatedFields = schemaRegister.safeParse(
        {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        }
    )
    if(!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error?.flatten().fieldErrors,
            strapiErrors: null,
            message: 'Ошибка заполнения полей',
        }
    }

    const res = await registerNewUser(validatedFields.data)
    if(!res) {
        return {
            ...prevState,
            zodErrors: null,
            strapiErrors: null,
            message: 'Что-то пошло не так :(',
        }
    }
    if(res.error) {
        return {
            ...prevState,
            zodErrors: null,
            strapiErrors: res.error,
            message: 'Ошибка регистрации',
        }
    }
    // @ts-ignore
    cookies().set("jwt", res.jwt, config);
    redirect('/dashboard')
    // return {
    //     ...prevState,
    //     zodErrors: null,
    //     data: res,
    //     message: 'Регистрация прошла!',
    // }
}