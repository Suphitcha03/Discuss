import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import PostCreateForm from "@/components/posts/post-create-form";
import { db } from '@/db';
interface TopicShowPageProps{
    params: Promise<{
        slug: string;
    }>
}

export default async function TopicShowPage({params}: TopicShowPageProps){
   
    const {slug} = await params;
    const topicTitle = decodeURIComponent(slug);

    const topic = await db.topic.findFirst({
        where: { slug: topicTitle }
    });
    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-2">
                {topicTitle}
            </h1>
            <p className="text-gray-600 mb-4">{topic?.description}</p>
            <PostList fetchData={()=>fetchPostsByTopicSlug(slug)}/>
            
        </div>

        <div>
            <PostCreateForm slug={topicTitle}/>
        </div>
    </div>;
}


