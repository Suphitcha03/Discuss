import { Post } from "@prisma/client";
import { db } from "@/db";


export type PostWithData = (
    Post & {
        topic: { slug: string};
        user: { name: string | null};
        //การใส่ _ นำหน้า ไม่ใช่กฎของ JavaScript หรือ TypeScript แต่เป็น สัญลักษณ์พิเศษของ Prisma เพื่อบอกว่า "ก้อนนี้คือผลรวมสถิติ/ตัวเลขนับจำนวนนะ"
        _count: {comments:number}
    }
);

//59 => import at app/search-page
export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]> {
    return db.post.findMany({
        include: {
            topic: { select: {slug: true}},
            user: {select: {name: true, image: true}},
            _count: {select: {comments: true}}
        },
        where: {
            OR: [
                { title: { contains: term}},
                { content: {contains: term}}
            ]
        }
    })
}

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
    return db.post.findMany({
        where: {topic: {slug:slug}},
        //ใช้ตอบสนองสำหรับการโหลดของข้อมูล
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true}},
            _count: {select: {comments:true}}
        }
    })
}

//56

export function fetchTopPosts(): Promise<PostWithData[]> {
    return db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: "desc"
                }
            }
        ],
        include: {
            topic: {select: {slug: true}},
            user: { select: { name:true, image: true}},
            _count: { select: {comments: true}}
        },
        take: 5,
    })
}