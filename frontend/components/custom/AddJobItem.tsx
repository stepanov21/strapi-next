"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/custom/DatePicker";
import { useFormState } from "react-dom";
import { addNewJobAction } from "@/data/action/job-action";
import { IJobItem } from "@/app/(main)/dashboard/page";
import { ZodError } from "zod";
import ErrorToast from "./ErrorToast";

export interface IJobState {
  data: null | IJobItem;
  zodErrors: null | ZodError;
  message: null | string;
}

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    strapiErrors: false,
    message: null,
  }

const AddJobItem = () => {
  const [state, action] = useFormState(addNewJobAction, INITIAL_STATE);
  console.log(state);
  const ref = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    ref.current?.reset()
  })

  return (
    <form ref={ref} action={action} className="mb-6">
      <Card className="min-w-[350px] pt-6 sm:pt-0">
        <CardContent className="sm:p-4">
          <div className="flex items-center gap-4 sm:flex-col">
            <Input name="company" placeholder={state?.message ? state?.message : "Компания"} className={state?.message && 'placeholder:text-red-400 right-icon'}/>
            <Input name="jobTitle" placeholder="Вакансия" />
            {/*<DatePicker/>*/}
            <Button className="sm:w-full">Добавить</Button>
          </div>
        </CardContent>
      </Card>
      <ErrorToast errorFields={state?.strapiErrors} message={state?.message}/>
    </form>
  );
};

export default AddJobItem;
