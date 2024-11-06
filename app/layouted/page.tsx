import React from 'react';
import dynamic from 'next/dynamic';
import { devicePpi } from '@/data/texts';

interface LayoutedPageProps {
  searchParams: {
    text: string;
    margin?: string;
    devicePpi?: number;
  };
}

const TextLayout = dynamic(() => import('@/components/TextLayout'), { ssr: false });

const LayoutedPage: React.FC<LayoutedPageProps> = ({ searchParams }) => {
  const text = searchParams.text || "エラーが発生しました。（再読み込みしてください。）";

  return (
    <div>
      <TextLayout text={text} devicePpi={devicePpi} />
    </div>
  );
};

export default LayoutedPage;
