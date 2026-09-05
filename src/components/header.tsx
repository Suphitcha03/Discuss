//24 add client delete async
'use client';
import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
   
} from '@nextui-org/react';

//import {auth} from '@/auth';
//26
//import * as actions from '@/actions';
//29
import HeaderAuth from './header-auth';
//57
import SearchInput from './search-input';
//61

import { Suspense } from 'react';

export default  function Header(){
    //everypage เลยกลายเป็น Dynamic
    //const session = await auth();

    return(
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href="/" className='font-bold'>Disscuss</Link>
            </NavbarBrand>

            <NavbarContent justify='center'>
                <NavbarItem>
                    {/* //57  61*/}
                    <Suspense>
                        <SearchInput/>
                    </Suspense>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify='end'>
             
                  <HeaderAuth/>
          
            </NavbarContent>

        </Navbar>
    );
}