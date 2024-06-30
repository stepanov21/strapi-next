'use server'

import {z} from "zod";
import {addNewJob} from "@/data/services/add-new-job-service";

export interface INewJob {
    company: string;
    title: string;
}

const schemaRegister = z.object({
    company: z.string().min(2).max(100, {
        message: "Меньше двух нельзя",
    }),
    title: z.string({
        message: "Введи название вакансии",
    }),
});

export async function addNewJobAction(prevState, formData: FormData) {

    const validatedFields = schemaRegister.safeParse(
        {
            company: formData.get('company'),
            title: formData.get('title')
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

    const res = await addNewJob(validatedFields.data)
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
    // return {
    //     ...prevState,
    //     zodErrors: null,
    //     data: res,
    //     message: 'Регистрация прошла!',
    // }
}