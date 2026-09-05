'use client';

//import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

interface FormButtonProps{
    children: React.ReactNode;
    isLoading?: boolean;
}

export default function FormButton({children, isLoading = false}: FormButtonProps){
    //แก้เอง 60 const {pending} = useFormStatus();

    return(
    <Button type="submit" isLoading={isLoading}>
        {children}
    </Button>
    );
}