"use client"

import React from 'react'
import {useForm} from "react-hook-form"
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
type inputs={
    email:string;
    password:string;

}
const LoginForm = () => {

    const {register,handleSubmit,formState,reset}= useForm<inputs>();

    useEffect(()=>{
       reset({email:"",password:""}) 
    },[])
    const handleFormSubmit=()=>{
        reset()
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
<div >
    <h1 className='text-xl font-bold my-4 text text-center'>Login</h1>
    <form onSubmit={handleSubmit(handleFormSubmit)} className='shadow-lg border-t-4 border-blue-400 rounded-lg p-5'>
    <div className='mb-2'>
                    <label htmlFor="email">Email</label>
                    <Input type="text"  placeholder='email'
                    {...register("email",{
                        required:"the email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email"
                        }
                    })}
                    />
                    {formState.errors.email &&
                    <p className='text-red-500'>
                        {formState.errors.email.message}
                    </p>
                    }
                </div>

                <div className='mb-2'>
                    <label htmlFor="password">Password</label>
                    <Input type="text" placeholder='password' 
                    {...register("password",{
                        required:"The password is required",
                        maxLength:{
                            value:8,
                            message:"Password should contain at least 8 characters "
                        }
                    })}
                    />
                    {formState.errors.password && 
                    <p className='text-red-500'>
                        {formState.errors.password.message}
                    </p>
                    }
                </div>

                <Button type="submit">Login</Button>

    </form>
</div>
    </div>
  )
}

export default LoginForm