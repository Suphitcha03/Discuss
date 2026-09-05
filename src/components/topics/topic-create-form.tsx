//31
'use client'
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
//32
import * as actions from '@/actions';

//34
import { useActionState } from "react";

//36 add เพิ่ม
// isInvalid={!!formState.errors.name}
//errorMessage={formState.errors.name?.join(', ')}
//39 from-button
import FormButton from '@/components/common/form-button';


export default function TopicCreateForm(){
                                                    //add 5 เเล้วไป add number at create-topicด้วย          
    const [formState,action, isPending] = useActionState(actions.createTopic, {
        errors:{}
    }); 
    // ถ้าใส่ { errors: {} } เป็นค่าเริ่มต้น: ในครั้งแรกที่เปิดหน้าเว็บ (ยังไม่ได้กด Submit) formState.errors จะเป็น Object ว่าง {} ทำให้การเข้าถึง formState.errors.name ไม่เกิด Error แต่จะได้ค่า undefined และผ่านไปได้เงียบๆ

    
    return(
        <Popover  placement='left'>
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg'>Createt a Topic</h3>
                        <Input 
                            name ="name" 
                            label="Name" 
                            labelPlacement="outside" 
                            placeholder="Name"
                            //isInvalid: แปลงค่า Error ให้เป็น Boolean (true/false) ด้วย !! หากมี Error กล่องข้อความจะเปลี่ยนเป็นสีแดง
                            isInvalid={!!formState.errors.name}
                            //errorMessage: นำข้อความ Error ใน Array มาต่อกันด้วยเครื่องหมาย comma แล้วแสดงใต้กล่องข้อความ
                            errorMessage={formState.errors.name?.join(', ')}
                            />
                            
                        <Textarea 
                            name="description"
                            label="Description" 
                            labelPlacement="outside" 
                            placeholder="Describe your topic"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')}
                        />
                            {/* การจัดการ Form-level Error ?. (Optional Chaining) ใส่ไว้เพื่อความปลอดภัย ถ้าตัวแปร _form เป็น undefined (ไม่มี Error) โปรแกรมจะไม่แครช และจะข้ามไปทำงานส่วนอื่นทันที */}
                            {/* .join(' ')  เป็นเมธอดของ Array ที่ใช้นำข้อความทุกตัวในอาร์เรย์มารวมกันให้เป็น String เดียว โดยคั่นด้วยช่องว่าง ' '*/}
                            {formState.errors._form 
                            ? (<div 
                            className="p-2 bg-red-200 border border-red-400 rounded">
                                {formState.errors._form?.join(' ')}
                            </div> 
                            ) : null}

                            <FormButton isLoading={isPending}>Save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}



// function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     startTransition(() => {
//       action(formData);
//     });
//   }

//     <form onSubmit={handleSubmit} noValidate>
//           ...
//         </form>