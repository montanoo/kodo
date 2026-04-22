import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TurndownService from 'turndown';
import { useRef } from 'react';
import {
  Bold,
  Italic,
  Code,
  Code2,
  List,
  ListOrdered,
  Strikethrough,
  type LucideIcon,
} from 'lucide-react';
import styles from './MessageInput.module.css';

import { socket } from '../../../lib/socket';
import spaceStore from '../../../store/spaces.store';

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

interface ToolbarButtonProps {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  title: string;
}

function ToolbarButton({
  active,
  onClick,
  icon: Icon,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-1.5 transition-colors cursor-pointer rounded-sm
        ${active ? 'text-accent' : 'text-muted hover:text-accent'}`}
    >
      <Icon size={13} strokeWidth={2} />
    </button>
  );
}

export default function MessageInput() {
  const spaceId = spaceStore((state) => state.currentSpaceId);
  const channelId = spaceStore((state) => state.currentChannelId);
  const sendRef = useRef<() => void>(() => {});

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          'Type a message... (Enter to send, Shift+Enter for newline)',
      }),
    ],
    editorProps: {
      attributes: {
        class: `${styles.editor} px-3.5 py-2.5 font-sans text-sm text-text caret-accent leading-relaxed`,
      },
      handleKeyDown: (_view, event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          sendRef.current();
          return true;
        }
        return false;
      },
    },
  });

  function sendMessage() {
    if (!editor || editor.getText().trim().length === 0) return;
    if (!spaceId || !channelId) return;
    const markdown = td.turndown(editor.getHTML());
    socket.emit('message:send', { text: markdown, spaceId, channelId });
    editor.commands.clearContent();
  }

  sendRef.current = sendMessage;

  if (!editor) return null;

  return (
    <div className="px-6 py-3 shrink-0">
      <div
        className={`${styles.inputBox} border border-border focus-within:border-accent transition-colors`}
      >
        <div className="flex items-center gap-px px-2 py-1 border-b border-border">
          <ToolbarButton
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon={Bold}
            title="Bold (⌘B)"
          />
          <ToolbarButton
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon={Italic}
            title="Italic (⌘I)"
          />
          <ToolbarButton
            active={editor.isActive('strike')}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon={Strikethrough}
            title="Strikethrough"
          />
          <div className="w-px h-3 bg-border mx-1 shrink-0" />
          <ToolbarButton
            active={editor.isActive('code')}
            onClick={() => editor.chain().focus().toggleCode().run()}
            icon={Code}
            title="Inline code"
          />
          <ToolbarButton
            active={editor.isActive('codeBlock')}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            icon={Code2}
            title="Code block"
          />
          <div className="w-px h-3 bg-border mx-1 shrink-0" />
          <ToolbarButton
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon={List}
            title="Bullet list"
          />
          <ToolbarButton
            active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon={ListOrdered}
            title="Ordered list"
          />
        </div>

        <EditorContent editor={editor} />

        <div className="flex items-center justify-between px-2.5 py-1.5">
          <span className="font-mono text-[0.6rem] text-muted tracking-wide">
            Shift+Enter for newline
          </span>
          <button
            type="button"
            onClick={() => sendRef.current()}
            className="bg-accent text-bg font-mono text-[0.7rem] font-semibold uppercase tracking-widest px-4 py-1.5 ml-2 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
