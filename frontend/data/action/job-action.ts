'use server'

import {z} from "zod";
import {addNewJob, deleteJob} from "@/data/services/job-service";
import {redirect} from "next/navigation";

export interface INewJob {
    company: string;
    jobTitle: string;
}

const schemaRegister = z.object({
    company: z.string().min(2).max(100, {
        message: "Меньше двух нельзя",
    }),
    jobTitle: z.string({
        message: "Введи название вакансии",
    }),
});

export async function addNewJobAction(prevState, formData: FormData) {

    const validatedFields = schemaRegister.safeParse<INewJob>(
        {
            company: formData.get('company'),
            jobTitle: formData.get('jobTitle')
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
    redirect('/dashboard');
    // return {
    //     ...prevState,
    //     zodErrors: null,
    //     data: res,
    //     message: 'Регистрация прошла!',
    // }
}

export async function deleteJobAction(id) {
    const res = await deleteJob(id)
    if(!res) {
        return
    }

    if(res.error) {
        return
    }

    redirect('/dashboard')
}