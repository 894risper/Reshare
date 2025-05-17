"use client"
import React from 'react'
import {useForm} from "react-hook-form"
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
type inputs={
    password: string;
    email: string;
    username:string;
}

const RegistrationForm = () => {
    const {register, handleSubmit,formState,reset}= useForm<inputs>()
    const handleFormSubmit=()=>{
        reset();
    }
    useEffect( ()=>{
        reset({password:"",email:"",username:""})
    },[]);
  return (
    <div className='flex  flex-col items-center justify-center h-screen'>
        <div className=''>
            <h1 className='text-xl font-bold text-center py-2'>Registration</h1>
            <form className= 'border-t-4 border-blue-400 shadow-lg p-5 rounded-md'
             onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='mb-2'>
                    <label htmlFor="username"> Username</label>
                    <Input
                    type="text"
                    placeholder='username'
                    {...register("username",{
                        required:"The username is required",
                        pattern:{
                            value:/^[a-zA-Z]+$/,
                            message:"the username should only contain letters"
                        }
                    })}
                    />
                    {formState.errors.username && 
                    <p className='text-red-500'>
                        {formState.errors.username.message}
                    </p>
                    }

                </div>

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

                <Button type='submit'>Register</Button>
            </form>
        </div>

    </div>
  )
}

export default RegistrationForm