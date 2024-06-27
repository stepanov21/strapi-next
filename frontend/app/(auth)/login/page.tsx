'use client'

import React from 'react';
import {useFormState} from 'react-dom'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {registerUserAction} from "@/data/action/auth-action";
import Link from "next/link";

const SignUp = () => {
    const [state, action] = useFormState(registerUserAction, {

    })
    return (
        <form action={registerUserAction}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className='text-center text-2xl'>Вход</CardTitle>
                    <CardDescription className='text-center'>Или у тебя еще нет аккаунта ? <Link href={'/sign-up'} className='underline text-gray-800'>Жми сюда!</Link></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-2.5">
                            <Input name='identifier' placeholder="Твой логин или мейл" />
                            <Input name='password' placeholder="Твой пароль" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type='submit' className='w-full'>Войти</Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default SignUp;