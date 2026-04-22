import { Menu } from 'lucide-react';
import MessageInput from '../features/messages/components/MessageInput';
import useSpaces from '../features/spaces/hooks/useSpaces';
import TopBar from '../../src/components/layout/TopBar';
import ChatView from '../../src/features/messages/components/ChatView';

export default function AppPage() {
  const { data: spaces, isLoading, isError } = useSpaces();

  if (isLoading) return <div>loading...</div>;

  return (
    <section className="h-screen flex flex-col bg-bg">
      <TopBar />
      <main className="flex-1">
        <ChatView />
      </main>
      <footer>
        <MessageInput />
      </footer>
    </section>
  );
}
