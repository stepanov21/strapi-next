"use server";

import { z } from "zod";
import {
  addNewJob,
  deleteJob,
  findJobById,
  updateJobStatus,
} from "@/data/services/job-service";
import { redirect } from "next/navigation";

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

export async function addNewJobAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    company: formData.get("company"),
    jobTitle: formData.get("jobTitle"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error?.flatten().fieldErrors,
      strapiErrors: null,
      message: "Ошибка заполнения полей",
    };
  }
  
  const findOne = await findJobById(validatedFields.data.company);
  console.log(findOne, "Строка 38");

  if (findOne?.data?.length > 1) {
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: true,
      message: "Такая компания уже есть",
    };
  }

  const res = await addNewJob(validatedFields.data);
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

  redirect("/dashboard");
}

export async function deleteJobAction(id) {
  const res = await deleteJob(id);
  if (!res) {
    return;
  }

  if (res.error) {
    return;
  }

  redirect("/dashboard");
}

export async function updateJobAction(id, data) {
  const res = await updateJobStatus(id, data);
  if (!res) {
    return console.log("Чето не то");
  }

  if (res.error) {
    return console.log(res.error);
  }

  redirect("/dashboard");
}
