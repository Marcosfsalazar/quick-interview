import ChatWindow from '@/components/ChatWindow/ChatWindow';

export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <main className="h-screen flex justify-center py-8 px-4">
      <ChatWindow />
    </main>
  );
}
