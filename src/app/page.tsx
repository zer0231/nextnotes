import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        {/* <Image src={logo} alt="openai-notes logo" width={100} height={100}/> */}
        <span className="font-extrabold traacking-tight text-4xl lg:text-5xl">
          OpenAi-Notes
        </span>
      </div>
      <p className="text-center max-w-prose">
        A note taking app with open-ai integrated. ez
      </p>

      {/* Since button is an element of shadcn  and in order to goto next page we must use link so we use button as child this way */}
      <Button asChild>
        <Link href="/notes">Open</Link>
      </Button>
    </main>
  );
}
