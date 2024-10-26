import React from 'react';
import dynamic from 'next/dynamic';

interface LayoutedPageProps {
  searchParams: {
    text: string;
    margin?: string;
  };
}

const TextLayout = dynamic(() => import('@/components/TextLayout'), { ssr: false });

const LayoutedPage: React.FC<LayoutedPageProps> = ({ searchParams }) => {
  const text = searchParams.text || "エラーが発生しました。";

  return (
    <div>
      <TextLayout text={text} />
    </div>
  );
};

export default LayoutedPage;
