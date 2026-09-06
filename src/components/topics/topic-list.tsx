import TopicChip from './topic-chip';
import { db } from '@/db';


export default  async function TopicList(){
    const topics = await db.topic.findMany();

    const renderTopics = topics.map((topic)=>{
        return <TopicChip key={topic.id} topic={topic}/>
    })

    return <div className='flex flex-row flex-wrap gap-2'>
        {renderTopics}
    </div>

}