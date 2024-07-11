'use client'

import React from 'react';
import {useFormState} from 'react-dom'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {loginUserAction} from "@/data/action/auth-action";
import Link from "next/link";
import ErrorToast from '@/components/custom/ErrorToast';

const SignUp = () => {
    const [state, action] = useFormState(loginUserAction, {
        data: null,
        zodErrors: null,
        message: null,
    })
    console.log(state)
    return (
        <form action={action}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>Вход</CardTitle>
                    <CardDescription className='text-center'>Или у тебя еще нет аккаунта ? <Link href={'/sign-up'} className='underline text-gray-800'>Жми сюда!</Link></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-2.5">
                            <Input name='identifier' placeholder="Твой логин или мейл" />
                            <Input name='password' type='password' placeholder="Твой пароль" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type='submit' className='w-full'>Войти</Button>
                </CardFooter>
                <ErrorToast errorFields={state.zodErrors} message={state.message}/>
            </Card>
        </form>
    );
};

export default SignUp;