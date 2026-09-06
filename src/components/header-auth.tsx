//Dynamic Component ใส่ฝั่ง Client (Browser) เพราะมีการใช้ React Hooks (useSession) เเละมีการตอบสนองกับผู้ใช้ (Interactive UI)
'use client';

//28
import {
    Button,
    Avatar,
    NavbarItem,
    Popover, //เป็น Component ตัวนอกสุด ทำหน้าที่ควบคุมสถานะการเปิด-ปิด และกำหนดการตั้งค่าทั่วไปของป๊อบอัป เช่น ตำแหน่งการแสดงผล (placement="top-end")
    PopoverTrigger, //เป็น Component ที่ใช้ห่อหุ้มสิ่งที่คุณต้องการให้ผู้ใช้ "กด" เพื่อเปิดป๊อบอัปขึ้นมา
    PopoverContent, // เป็น Component ที่ใช้ห่อหุ้ม "เนื้อหาหรือ UI" ที่จะแสดงผลเมื่อป๊อบอัปเปิดออก
} from '@nextui-org/react';

import { useSession } from 'next-auth/react';
import * as actions from '@/actions';
//add new
import { FaGithub,FaGoogle } from 'react-icons/fa';


export default function HeaderAuth(){ //ประกาศ Component หลักชื่อ HeaderAuth สำหรับนำไปแปะไว้บนแถบ Header/Navbar ของเว็บไซต์
    
    const session = useSession(); //เรียกใช้ Hook เพื่อดึงสถานะการเข้าสู่ระบบปัจจุบัน โดยจะได้ Object กลับมา ซึ่งมีค่าสำคัญคือ session.status และ session.data

    //26 สร้างตัวแปรเพื่อรอเก็บ JSX (องค์ประกอบ UI) ที่จะนำไปแสดงผล
    let authContent: React.ReactNode;
        //เงื่อนไขที่ 1: ขณะกำลังโหลดข้อมูล
    if (session.status ==="loading"){
        //ตั้งค่าเป็น null เพื่อไม่ให้แสดงผลอะไรเลยบนหน้าจอ ป้องกันไม่ให้ปุ่ม Sign In หรือ Avatar โผล่มาแวบๆ ระหว่างรอระบบเช็ก Session
        authContent = null;
        //เงื่อนไขที่ 2: ล็อกอินสำเร็จแล้ว
    }else if (session.data?.user) {

        authContent = (
        <Popover placement= "top-end">

            <PopoverTrigger> 
                <Avatar src={session.data.user.image || ''}/>
            </PopoverTrigger>

            <PopoverContent>
                <div className='p-4'>
                    <form action={actions.signOut}>
                        <Button type='submit'>Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>

        </Popover>
        )
    }else{
        authContent = (
        <>
        <NavbarItem>
            <form action={()=> actions.signIn('github')}>
                <Button type='submit' 
                color="secondary" 
                variant="bordered"
                startContent={<FaGithub size={18}/>}>
                Sign In with GitHub
                </Button>
            </form>
        </NavbarItem>

        <NavbarItem>
            <form action={()=> actions.signIn('google')}>
               <Button 
               type='submit' 
               color="primary" 
               variant='flat'
               startContent={<FaGoogle size={18}/>}>
                Sign In with Google
                </Button>
            </form>
        </NavbarItem>

        </>
    );
 }

 return authContent;

}