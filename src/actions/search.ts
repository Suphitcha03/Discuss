//58

'use server';

import { redirect } from "next/navigation";
//60
// import PostList from "@/components/posts/post-list";
// import { fetchPostsBySearchTerm } from "@/db/queries/posts";



export async function search(formData: FormData){
    const term = formData.get('term');

    if(typeof term !== 'string' || !term) {
        redirect('/');
    }

    redirect(`/search?term=${term}`);
}

