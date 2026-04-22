import useMessages from '../hooks/useMessages';
import Markdown from 'react-markdown';

export default function ChatView() {
  const { data: messages, isLoading, isError } = useMessages();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-6 py-3">
      {messages?.map((message) => {
        const initials = message.user.username
          .split(' ')
          .map((w) => w[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();
        const color = getUserColor(message.user.username);
        return (
          <div
            key={message.id}
            className="flex gap-2 py-1 px-2 hover:bg-[rgba(255,255,255,.02)]"
          >
            <div
              className={`h-7 w-7 ${color.bg} flex items-center justify-center font-mono text-xs font-bold text-bg shrink-0`}
            >
              {initials}
            </div>
            <div className="font-sans">
              <span
                className={`${color.text} font-mono text-xs font-semibold flex items-baseline mb-1`}
              >
                {message.user.username}
              </span>
              <div className="text-muted-two text-sm">
                <Markdown>{message.text}</Markdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const AVATAR_COLORS = [
  { bg: 'bg-accent', text: 'text-accent' },
  { bg: 'bg-green', text: 'text-green' },
  { bg: 'bg-amber', text: 'text-amber' },
  { bg: 'bg-red', text: 'text-red' },
] as const;

function getUserColor(username: string) {
  const hash = username
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
