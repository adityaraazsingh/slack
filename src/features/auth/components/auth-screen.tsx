"use client";
import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";



export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  

  
  return (
    <div className="h-screen flex items-center justify-center  text-white text-2xl">
    
      <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
      <div className=" ">
        {state == "signIn" ? <SignInCard setState={setState}/> : <SignUpCard setState={setState} />}
        
      </div>
      </div>
    </BackgroundGradientAnimation>
    </div>
  );
};
