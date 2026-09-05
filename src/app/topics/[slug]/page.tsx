//14
//44
//47
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

import PostCreateForm from "@/components/posts/post-create-form";

//43
interface TopicShowPageProps{
    params: Promise<{
        slug: string;
    }>
}

export default async function TopicShowPage({params}: TopicShowPageProps){
   
    const {slug} = await params;

    //เพิ่มเอง42 ให้มันไม่เป็น%20
    const topicTitle = decodeURIComponent(slug);

    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-2">
                {topicTitle}
            </h1>
            <PostList fetchData={()=>fetchPostsByTopicSlug(slug)}/>
            
        </div>

        <div>
            <PostCreateForm slug={slug}/>
        </div>
    </div>;
}


