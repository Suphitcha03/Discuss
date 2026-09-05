//0
// import { Button } from "@nextui-org/react";
// //8
// import * as actions from '@/actions';
// import { auth } from "@/auth";
// //11
// import Profile from "@/components/profile";
//30
import TopicCreateForm from "@/components/topics/topic-create-form"
//41
import TopicList from '@/components/topics/topic-list';
import { Divider } from "@nextui-org/react";
//56
import PostList from "@/components/posts/post-list";
import { fetchTopPosts } from "@/db/queries/posts";


// ดูได้ว่ายูเซอร์ สมัคร จากฟอร์ม ที่ Server Component 
export default async function Home() {
  
  return<div className="grid grid-cols-4 gap-4 p-4"> 
      <div className="col-span-3">
          <h1 className="text-xl m-2">Top Posts</h1>
      <PostList fetchData={fetchTopPosts}/>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm/>
          <Divider className="my-2"/>
          <h3 className="text-lg">Topics</h3>
        <TopicList/>
      </div>
  </div>


  //27 ลบออกเอาไว้โชว์ตอนแรกเฉยๆ ทำในหน้าComponent/ header เเล้ว
  // const session = await auth();

  // return (
  //   <div>

  //     <form action={actions.signIn}>
  //     <Button type="submit">SignIn</Button>
  //     </form>

  //     <form action={actions.signOut}>
  //     <Button type="submit">SignOut</Button>
  //     </form>


  //     {
  //     session?.user 
  //     ? <div>{JSON.stringify(session.user)}</div>
  //     : <div>Signed Out</div>
  //     }

  //     <Profile/>
  //   </div>
  
  // );
}
