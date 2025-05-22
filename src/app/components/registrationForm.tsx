"use client"
import React from 'react'
import {useForm} from "react-hook-form"
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
type inputs={
    password: string;
    email: string;
    username:string;
}

const RegistrationForm = () => {
    const {register, handleSubmit,formState,reset}= useForm<inputs>()
    useEffect( ()=>{
        reset({password:"",email:"",username:""})
    },[]);
    const router = useRouter()
    const handleFormSubmit= async(data:inputs)=>{


        try{

            const res = await fetch("api/userExists",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:data.email}),
            });
            const {user}= await res.json();

            if(user){
                alert("User already exists with this email")
                return;
            }


           const resRegister= await fetch('api/register',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            });

            if (resRegister.ok) {
                alert("Registration successful!");

                reset();
                router.push("/login")
            } else {
                alert("Failed to register.");
            }

        }catch(error){
            console.log("error registaring the user")
        }
        



    }
    
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
                    <Input type="password" placeholder='password' 
                    {...register("password",{
                        required:"The password is required",
                        minLength:{
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

                <Link className='text-sm mt-3 text-right block' href={'/login'}>Already have an account? <span className='underline text-blue-500'>Login</span> </Link>
            </form>
        </div>

    </div>
  )
}

export default RegistrationForm