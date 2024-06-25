import { SignUp } from "@clerk/nextjs";

import { Metadata } from "next"


export const metadata:Metadata = {
    title: "OpenAi: Sign Up"
}

export default function SignInPage(){
    return (
        <div className="flex h-screen items-center justify-center">
            <SignUp appearance={{variables:{colorPrimary:"#0F712A"}}}/>
        </div>
    )
}