'use client';
import {
    Button,
    Avatar,
    NavbarItem,
    Popover, 
    PopoverTrigger, 
    PopoverContent, 
} from '@nextui-org/react';

import { useSession } from 'next-auth/react';
import * as actions from '@/actions';
import { FaGithub,FaGoogle } from 'react-icons/fa';


export default function HeaderAuth(){ 
    
    const session = useSession(); 
    let authContent: React.ReactNode;

    if (session.status ==="loading"){
        
        authContent = null;

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