import type { Comment } from '@prisma/client';
import {db} from '@/db';
//53  ไม่ว่าใน Server Components (CommentList, CommentShow Recursive หลายๆ ชั้น) จะเรียก fetchCommentsByPostId(postId) พร้อมกันกี่สิบครั้งก็ตาม
//React จะรันคำสั่ง Query ดึงข้อมูลจาก Database เพียงครั้งเดียวเท่านั้น และนำผลลัพธ์กระจายส่งกลับไปให้ทุก Component ที่เรียกใช้ทันที
import { cache } from 'react';

export type CommentWithAuthor = Comment & {
     user: { 
        name: string | null; 
        image: string | null;
    };
} ;


//53 เปลี่ยน function เป็น Arrow Function นำฟังก์ชันทั้งหมดห่อด้วย cache(...)
export const fetchCommentsByPostId = cache((
    postId: string
): Promise<CommentWithAuthor[]> => {
    console.log('Making a query!')

    return db.comment.findMany({
        where: {postId},
        include: {
            user: {
                select: {
                    name:true,
                    image:true
                }
            }
        }
    })
});

