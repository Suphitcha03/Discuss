import Link from 'next/link';
import paths from '@/paths';
//46
import type { PostWithData} from '@/db/queries/posts';

//กำหนดว่าต้องรับ Prop ชื่อ fetchData
interface PostListProps {

  fetchData: ()=> Promise<PostWithData[]>

}


// TODO: Get list of posts into this component somehow
export default async function PostList({fetchData} : PostListProps) {
  //ตัวลูกเป็นคนกดเรียกฟังก์ชันนี้เอง เพื่อเอาข้อมูล Post ออกมาแปะลง HTML
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
