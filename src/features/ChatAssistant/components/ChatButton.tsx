import { MessageCircle } from "lucide-react";

import { useChatStore } from "../stores/chatStore";

export default function ChatButton() {
	const open = useChatStore((s) => s.open);

	return (
		<>
			<button
				type="button"
				onClick={open}
				aria-label="Open chat assistant"
				className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-12 h-40 bg-primary text-white rounded-l-lg shadow-soft-hover hover:bg-primary/90 transition-all cursor-pointer"
			>
				<span
					className="text-sm font-bold tracking-wider uppercase"
					style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
				>
					Need Assistance
				</span>
			</button>

			<button
				type="button"
				onClick={open}
				aria-label="Open chat assistant"
				className="lg:hidden fixed top-[68px] left-0 right-0 z-40 flex items-center justify-center gap-2 h-12 bg-primary text-white shadow-soft-hover hover:bg-primary/90 transition-all cursor-pointer"
			>
				<MessageCircle size={20} />
				<span className="text-sm font-bold tracking-wider uppercase">
					Need Assistance
				</span>
			</button>
		</>
	);
}
