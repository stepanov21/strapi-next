'use client'

import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {DatePicker} from "@/components/custom/DatePicker";
import {useFormState} from "react-dom";
import {addNewJobAction} from "@/data/action/job-action";

const AddJobItem = () => {
    const [state, action] = useFormState(addNewJobAction, {
        data: null,
        zodErrors: null,
        message: null,
    })
    console.log(state)
    return (
        <form action={action}>
            <Card className="min-w-[350px] pt-6">
                <CardContent>
                        <div className="flex items-center gap-4">
                            <Input name='company' placeholder="Компания"/>
                            <Input name='jobTitle' placeholder="Вакансия"/>
                            <DatePicker/>
                            <Button>Добавить</Button>
                        </div>
                </CardContent>
            </Card>
        </form>
    );
};

export default AddJobItem;
