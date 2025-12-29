import { cn } from "@/lib/utils"; //combine tailwind class and overwrite it
import { Message, useChat } from "ai/react";
import { XCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}
export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();
  return (
    <div
      className={cn(
        "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36 ",
        open ? "fixed" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex flex-col rounded bg-background border shadow-xl h-[600px]">
        <div className="h-full">Messages </div>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id}/>
        ))}
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something . . ."
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
  return (
    <div className="p-2">
      {role=="user" ? (
        <div className="text-blue-500">You</div>
      ) : (
        <div className="text-green-500">AI</div>
      )}
      <div>{content}</div>
    </div>
  );
}
