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
import { Label } from '@/components/ui/label'
import { GenderOptions } from '@/constants'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import axios from "axios"
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'sonner'
import { FaUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
 
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Others"]),
  password:z.string().min(8,"Password must be at least 8 characters")

})

const page = () => {
  const [passwordType, setPasswordType] = useState<"text" | "password">("password");
  const [isLoading,setIsLoading]=useState(false)
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
        name: "",
        email:"",
        gender:"Male",
        password:""
      },
  })
     
  // 2. Define a submit handler.
  const onSubmit=async(values: z.infer<typeof formSchema>)=> {
    console.log(values)
    setIsLoading(true)
    try{
      const response=await axios.post("/api/signup",values)
      console.log(response)
      if(response.data.success){
        form.reset()
        router.push("/login")
        toast("User signed up")
      }

    } catch(error){
      console.log(error)
    }
    setIsLoading(false)

  }
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-11/12  md:w-[60%] lg:w-[40%] mx-auto flex flex-col gap-y-2 shadow-sm px-4 py-12 rounded-md ">

          <h1 className="text-lg md:text-7xl font-bold text-neutral-900  ">
            Sign up
          </h1>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-neutral-900'>Full Name</FormLabel>
                <div className="flex rounded-md border gap-x-2 items-center  border-neutral-800 bg-neutral-300  text-neutral-900">
                  <FaUser className='text-lg text-neutral-900 ml-2'/>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} className='outline-none border-none'/>
                  </FormControl>
                </div>
                
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-neutral-900'>Email</FormLabel>
                <div className="flex rounded-md border gap-x-2 items-center  border-neutral-800 bg-neutral-300 text-neutral-900 ">
                  <MdOutlineEmail className='text-lg text-neutral-900 ml-2'/>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} className='outline-none border-none'/>
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
                <div className="flex items-center rounded-md border gap-x-2  border-neutral-800 bg-neutral-300 relative text-neutral-900 ">
                  
                  <RiLockPasswordLine className='text-lg text-neutral-900 ml-2'/>
                  
                  <FormControl>
                      <Input type={passwordType}  placeholder="enter password" {...field} className="outline-none border-none"/>
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

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-900">Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex h-11 gap-6 xl:justify-between"
                  >
                    {GenderOptions.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <RadioGroupItem id={item} value={item} />
                        <Label htmlFor={item} className="cursor-pointer text-neutral-900">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <SubmitButton isLoading={isLoading} className='text-neutral-900'>Submit</SubmitButton>
        </form>
      </Form>
    </div>
  )
}

export default page