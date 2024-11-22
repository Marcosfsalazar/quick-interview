import ChatWindow from '@/components/ChatWindow/ChatWindow';
import { loadJobData } from '@/utils/loadJobData';

export default function Page({ params }: { params: { slug: string } }) {
  const jobData = loadJobData({ fileName: params.slug });

  if (!jobData) return <></>;

  return (
    <main className="h-screen flex justify-center py-8 px-2">
      <ChatWindow data={jobData} />
    </main>
  );
}
