"use client"

import Authlayout from "@/components/authlayout/layout";
import { ReactNode } from "react";

export default function Productlayout({children}:{children:ReactNode}){
    return(
        <>
         <Authlayout>
         {children}
         </Authlayout>
        </>
    )
}