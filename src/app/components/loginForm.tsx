"use client"

import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Inputs = {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()
  const router = useRouter()

  useEffect(() => {
    reset({ email: "", password: "" })
  }, [])

  const handleFormSubmit = async (data: Inputs) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (res?.ok) {
      router.push("/dashboard") // ✅ Redirect to dashboard after login
    } else {
      alert("Invalid credentials") // Optional: replace with better error UI
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='text-xl font-bold my-4 text text-center'>Login</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className='shadow-lg border-t-4 border-blue-400 rounded-lg p-5'>

          <div className='mb-2'>
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              placeholder='email'
              {...register("email", {
                required: "The email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email"
                }
              })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='mb-2'>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              placeholder='password'
              {...register("password", {
                required: "The password is required",
                minLength: {
                  value: 8,
                  message: "Password should contain at least 8 characters"
                }
              })}
            />
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full mt-2">Login</Button>

          <Link href={'/registration'} className='text-sm mt-3 text-right block'>
            Don't have an account? <span className='underline text-blue-500'>Register</span>
          </Link>

        </form>
      </div>
    </div>
  )
}

export default LoginForm
