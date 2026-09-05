//1

'use client';

import { NextUIProvider } from "@nextui-org/react";
//10
import { SessionProvider } from "next-auth/react";

//สร้างเพื่อบอกว่า Component จะรับ Props อะไรมาบ้าง ข้อมูลนั้นมีชนิดเป็นอะไร 
//ดัก error
interface Providers {
            // TYpe สิ่งให้ก้ตามที่ React สามารถนำไป render ขึ้นจอได้ เช่น component ย่อย Tag HTML <div>, string or null
    children: React.ReactNode
}

export default function Providers ({children}:Providers){
    return(
        <SessionProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}