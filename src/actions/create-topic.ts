//17

'use server';
//31 ตรวจสอบข้อมูลจากฟอร์ม (name, description) ตามกฎที่กำหนด 
import {z} from 'zod'; 
//38 เช็กว่าผู้ใช้งานล็อกอินหรือยัง
import { auth } from '@/auth';
//39 Database Operation (Prisma): บันทึกข้อมูล Topic ลงฐานข้อมูล
import { Topic } from '@prisma/client';
//ล้างแคชหน้าแรก (/) และรีไดเรกต์ผู้ใช้ไปยังหน้าหัวข้อใหม่ที่สร้างเสร็จ
import { redirect } from 'next/navigation';
// ทำหน้าที่: ตัวแปร db คือ Prisma Client Instance ที่เซ็ตอัปไว้ใช้เชื่อมต่อและจัดการฐานข้อมูล
// การใช้งานในไฟล์นี้: ใช้สั่งการคำสั่ง SQL ผ่าน JavaScript เช่น await db.topic.create(...) เพื่อเพิ่มข้อมูล Topic ใหม่ลงใน Database
// ทำไมต้องแยกไฟล์ไว้ที่ @/db: เพื่อทำ Pattern ที่เรียกว่า Prisma Client Singleton ป้องกันไม่ให้ Next.js สร้าง Connection เชื่อมต่อ Database ซ้ำซ้อนหลายรอบเวลาสั่ง Re-render หรือใช้ Live Reload (Hot Reload) ในช่วง Dev
import { db } from '@/db';
import paths from '@/paths';
//ล้างแคชหน้าแรก (/) และรีไดเรกต์ผู้ใช้ไปยังหน้าหัวข้อใหม่ที่สร้างเสร็จ
import { revalidatePath } from 'next/cache';



//กฎการตรวจข้อมูล
const createTopicSchema = z.object({
    name: z
    .string()
    .min(3) //ต้องเป็นตัวพิมพ์เล็กหรือขีด - เท่านั้น (ห้ามมีเว้นวรรค)
    // .regex(/[a-z-]/, { 
    //     message: 'Must be lowercase letters or dashes without space'
    // }),
    .regex(/^[a-zA-Z0-9 ]+$/, {
        message: 'Must contain only letters, numbers and spaces'
    }),
    description: z
    .string()
    .min(10)
})
 
//35 โครงสร้างการคืนค่า Error ใช้ interface: รองรับโครงสร้าง Error ที่ได้มาจาก Zod

interface CreateTopicFormState {
    errors: {
        //ใช้เก็บ Error ที่เจาะจงเฉพาะช่องนั้นๆ เพื่อนำไปแปะไว้ใต้กล่องข้อความของช่องนั้นโดยตรง
        name?: string[];
        description?: string[];
        form?: string[];
        // ใช้เก็บ Form-level Errors หรือข้อผิดพลาดภาพรวมที่ไม่เกี่ยวกับช่องใดช่องหนึ่ง เช่น "คุณยังไม่ได้ล็อกอิน", "เชื่อมต่อ Database ไม่สำเร็จ", หรือ "ระบบล่ม" เพื่อนำไปแสดงเป็นกล่องตัวหนังสือสีแดงเตือนรวมๆ ด้านบนหรือด้านล่างสุดของฟอร์ม
        _form?: string[];
    };
}


//33 ส่วนประมวลผลหลัก            //เพิ่มตรงนี้อะ formState: number--> แปลงใหม่ละ
export async function createTopic(
    //รับ formState (สถานะเดิม จาก topics/topic-create-form)
    formState: CreateTopicFormState, 
    // formData (ข้อมูลจากฟอร์ม) เข้ามา ที่ถูกส่งมาเมื่อผู้ใช้กด Submit (มีค่าของช่อง name และ description)
    formData: FormData
    //เป็นการระบุด้วย TypeScript ว่าฟังก์ชันแบบ async นี้ เมื่อทำงานจบ จะต้องส่งคืนค่า (Return) เป็น Object ที่มีโครงสร้างตรงตาม CreateTopicFormState เท่านั้น
) : Promise<CreateTopicFormState>{


//39 ไม่เอาเเล้วได้ isLoading เเล้ว
    // await new Promise(resolve => setTimeout(resolve, 2500));




    //TODO: revalidate the homepage  การตรวจสอบข้อมูลด้วย Zod (safeParse)
  //safeParse(...): ทำการตรวจสอบข้อมูลโดย ไม่สั่งให้เกิด Error (Crash) หากข้อมูลไม่ตรงตาม Schema ค่า result.success จะกลายเป็น false
    const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
   });


   //ถ้าข้อมูลผิดกฏส่งมาแบบนี้
   if(!result.success){
    //Show error อ่านง่าย เเยกออกมาเป็น 1มิติ เเละโชว์เฉพาะข้อความที่error
        // console.log(result.error.flatten().fieldErrors);
        return{
            errors: result.error.flatten().fieldErrors
        };
   }

   //38 และ นำไป add ที่ ฟอร์ม {formState.errors._form?.join(', ')}
   //ป้องกันผู้ใช้ที่ไม่ได้ล็อกอินแอบส่ง Request มายิงสร้างข้อมูล
//หากไม่มี Session จะหยุดการทำงานทันที และคืนค่า Error เข้าช่อง _form เพื่อให้นำไปโชว์เป็นตัวหนังสือสีแดงแจ้งเตือนรวมๆ บนฟอร์ม
   const session = await auth();

   if(!session || !session.user){
    return{
        errors: {
            _form: ['You must be signed in to do this.']
        },
    };
   }

   //add เพิม่เอง 42 ใส่ใน try topic data slug
   const slugifiedName = result.data.name
   .trim()
//    .toLowerCase()

   //39- การจัดการฐานข้อมูลและ Error Handling
   let topic: Topic;
   try{
    // throw new Error('Failed to create topic');
    topic = await db.topic.create({
        data: {
            slug: slugifiedName,
            description: result.data.description
        }
    });
   } catch(err:unknown){
    // ทำไมต้องเช็ก err instanceof Error? ใน TypeScript ตัวแปรใน catch 
    // จะถูกมองเป็นชนิด unknown เสมอ การใช้ instanceof Error ช่วยยืนยันกับ 
    // TypeScript ว่า err เป็น Error Object จริงๆ จึงจะสามารถดึงข้อความ 
    // err.message ออกมาใช้งานได้อย่างปลอดภัย
    if(err instanceof Error){
        return{
            errors: {
                _form: [err.message]
            }
        }
    } else{
        return{
            errors: {
                _form: ['Something went wrong']
            }
        }
    }
    
   }
   //สั่ง Next.js ให้ลบแคชของหน้าแรกออก เพื่อให้หน้าแรกอัปเดตดึง Topic ใหม่ที่เพิ่งสร้างไปแสดงผลทันที
     revalidatePath('/');
     //สั่งย้ายหน้าจอผู้ใช้ไปยังหน้ารายละเอียดของ Topic ใหม่
     redirect(paths.topicShow(topic.slug));

   //รีเทิร์นเลขออกไปด้วย--->change ส่งสำเร็จหรือไม่
//    return {
//     errors: {}
//    };
   

}


// 1. Return isPending from useActionState:

// const [formState, action, isPending] = useActionState(actions.createTopic, {

// 2. Pass isPending from useActionState to the isLoading prop of the FormButton component:

// <FormButton isLoading={isPending}>Save</FormButton>



// In  form-button.tsx

// 1. Add isLoading to the interface:

// interface FormButtonProps {
//   children: React.ReactNode;
//   isLoading: boolean;
// }
// 2. Remove all useFormStatus logic and import

// 3. Recieve the isLoading prop in the FormButton Component

// export default function FormButton({ children, isLoading }: FormButtonProps) {

// 4. Pass isLoading instead of pending to the isLoading prop of the Button component

// <Button type="submit" isLoading={isLoading}>