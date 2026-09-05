// src/components/topics/topic-chip.tsx
'use client'; // กำหนดให้เป็น Client Component

import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import paths from '@/paths';

interface TopicChipProps {
  topic: {
    id: string;
    slug: string;
  };
}

export default function TopicChip({ topic }: TopicChipProps) {
  return (
    <div key={topic.id}>
      <Link href={paths.topicShow(topic.slug)}>
        <Chip color="warning" variant="shadow">
          {topic.slug}
        </Chip>
      </Link>
    </div>
  );
}