//57
'use client';
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
//58
import * as actions from '@/actions';

export default function SearchInput(){
    const searchParams = useSearchParams();
        // 57 http://localhost:3000/?term=javastuuuuuuuu เจอเลย ขึ้นช่องค้นหา
    return (
    <form action={actions.search}>
        <Input 
            name= "term"
            defaultValue={searchParams.get('term') || ""}
        />
    </form> 
    );
}