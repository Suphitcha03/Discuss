//49 เอาไฟล์เข้ามาเองไม่ได้พิม 

import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
//52
//import { fetchCommentsByPostId } from "@/db/queries/comments";
//53
import { Suspense } from "react";
//55
import PostShowLoading from "@/components/posts/post-show-loading";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  
    const { slug, postId } = await params;
    const decodedSlug = decodeURIComponent(slug);
  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {decodedSlug}
      </Link>
      <Suspense fallback={<PostShowLoading/>}>
        <PostShow postId={postId}/>
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      
      <CommentList postId={postId}/>
      {/* //56 */}
     
    
    </div>
  );
}
