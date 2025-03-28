'use client'
import { Button } from "@/components/ui/button";
import { ColourfulText } from "@/components/ui/colourful-text";
import { useRouter } from "next/navigation";

export default function Home() {


  const router=useRouter()


  const handler1=()=>{
    router.push("/signup")
  }

  const handler2=()=>{
    router.push("/login")
  }
  return (
    <div className="h-screen w-full  flex flex-col items-center justify-center antialiased">
      <div className="w-11/12  mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          <ColourfulText text="Transform Data into Decisions" /> 
          <div>One Table at a Time.</div> 
        </h1>
        

        <div className="relative z-10 flex items-center gap-x-4 w-fit mx-auto mt-4">
          <Button onClick={handler1} className="bg-white text-black px-4 py-2 rounded-md hover:scale-105 transition-scale duration-200 cursor-pointer">Sign up</Button>
          <Button onClick={handler2} className="bg-black text-white px-4 py-2 rounded-md hover:scale-105 transition-scale duration-200 cursor-pointer">Log in</Button>       
        
        </div>
        
      </div>
    </div>
  );
}
