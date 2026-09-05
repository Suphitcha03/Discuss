'use client';
//12 เช็กว่าผู้ใช้งานล็อกอินเข้าสู่ระบบแล้วหรือยัง Authentication Client Component (จำเป็นต้องใส่เพราะ React Hooks อย่าง useSession ทำงานบน Browser เท่านั้น)
import { useSession } from "next-auth/react";

//// ดูได้ว่ายูเซอร์ สมัคร จากฟอร์ม ที่ client Component require a sessionProvider to be set up in the 'provider.tsx' file

export default function Profile(){
    //เรียกใช้ Hook เพื่ออ่านสถานะการล็อกอิน session จะคืนค่ากลับมาเป็น Object
    const session = useSession();
        //มีข้อมูลผู้ใช้ถ้านั่งล็อกอินอยู่ (ถ้ายังไม่ล็อกอินจะเป็น null)
    if (session.data?.user) {
        return <div>From client: {JSON.stringify(session.data.user)}</div>
    }
    //(Not signed in)
    return<div>From client: user is NOT signed in</div>
}