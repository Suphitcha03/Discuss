import CommentShow from "@/components/comments/comment-show";
//import type { CommentWithAuthor } from "@/db/queries/comments";
//51
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentListProps {
//50
// fetchData: () => Promise<CommentWithAuthor[]>
//51
postId: string;

}

// TODO: Get a list of comments from somewhere
export default async function CommentList({postId}: CommentListProps) {
  //50
  //  const comments =await fetchData();
  //51
    const comments = await fetchCommentsByPostId(postId);
  
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        // comments={comments}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
