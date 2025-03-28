import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonProps{
    isLoading:boolean,
    className?:string,
    children:React.ReactNode
}
const SubmitButton = ({isLoading , className , children} : ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? "bg-neutral-300 w-full"}>
        {
            isLoading ? (
                <div className='flex items-center gap-4'>
                    <Image src='/icons/loader.svg' alt='loader' className='animate-spin' width={24} height={24}/>
                    Loding...
                </div>
            ) : children
        }
    </Button>
  )
}

export default SubmitButton