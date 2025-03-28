'use client'

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import axios from "axios"
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'sonner'
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from 'react-redux'
import { setToken } from '@/lib/redux/tableSlice'
 
const formSchema = z.object({
  
  email: z.string().email("Invalid email address"),
  password:z.string().min(8,"Password must be at least 8 characters")

})

const Page = () => {
  const [passwordType, setPasswordType] = useState<"text" | "password">("password");
  const [isLoading,setIsLoading]=useState(false)
  const dispatch=useDispatch()

  const router=useRouter()
  
  const passwordHandler=()=>{
    if(passwordType==="text"){
      setPasswordType("password")
    } else {
      setPasswordType("text")
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email:"",
        password:""
      },
  })
     
  const onSubmit=async(values: z.infer<typeof formSchema>)=> {
    console.log(values)
    setIsLoading(true)
    try{
      const response=await axios.post("/api/login",values)
      console.log(response)
      if(response.data.success){
        form.reset()
        dispatch(setToken(response.data.data.token))
        router.push("/dashboard")
        toast("User logged in")     
      }
    } catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }


  return (
    <div className='w-full h-screen flex items-center justify-center '>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-11/12  md:w-[60%] lg:w-[40%] mx-auto flex flex-col gap-y-2 shadow-sm px-4 py-12 rounded-md ">

          <h1 className=" text-lg md:text-7xl font-bold text-neutral-900  ">
            Log in
          </h1>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-neutral-900'>Email</FormLabel>
                <div className="flex items-center rounded-md border gap-x-2  border-neutral-800 bg-neutral-300  text-neutral-900">
                  <MdOutlineEmail className='text-lg text-neutral-900 ml-2'/>
                  
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} className='outline-none border-none focus:bg-neutral-300'/>
                  </FormControl>
                </div>
                
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-neutral-900'>Password</FormLabel>
                <div className="flex items-center rounded-md border gap-x-2  border-neutral-800 bg-neutral-300 relative text-neutral-900">
                  <RiLockPasswordLine className='text-lg text-neutral-900 ml-2'/>
                  
                  <FormControl>
                      <Input type={passwordType}  placeholder="enter password" {...field} className="outline-none border-none "/>
                  </FormControl>

                  <div onClick={passwordHandler} className="absolute top-[30%] right-2 cursor-pointer">
                      {
                          (passwordType==="text")? (<FaEye/>) : (<FaEyeSlash/>)
                      }
                  </div>
                </div>
                
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />
          
          <SubmitButton isLoading={isLoading} className='text-neutral-900'>Submit</SubmitButton>
        </form>
      </Form>
    </div>
  )
}

export default Page