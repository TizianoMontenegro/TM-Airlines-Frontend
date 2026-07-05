import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useChatStore } from "../stores/chatStore";
import type { ChatMessage } from "../types";

function MessageBubble({ message }: { message: ChatMessage }) {
	const isUser = message.role === "user";
	return (
		<div
			className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
		>
			<div
				className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
					isUser
						? "bg-primary text-white rounded-br-md"
						: "bg-surface-light dark:bg-box-dark text-[#121614] dark:text-white rounded-bl-md"
				}`}
			>
				<p className="text-sm leading-relaxed">{message.content}</p>
				<span
					className={`block text-[10px] mt-1 ${
						isUser
							? "text-white/70 text-right"
							: "text-medium-gray dark:text-white/50"
					}`}
				>
					{message.timestamp.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>
		</div>
	);
}

function LoadingDots() {
	return (
		<div className="flex justify-start mb-3">
			<div className="max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 bg-surface-light dark:bg-box-dark">
				<div className="flex gap-1.5">
					<span className="size-2 bg-medium-gray rounded-full animate-bounce [animation-delay:0ms]" />
					<span className="size-2 bg-medium-gray rounded-full animate-bounce [animation-delay:150ms]" />
					<span className="size-2 bg-medium-gray rounded-full animate-bounce [animation-delay:300ms]" />
				</div>
			</div>
		</div>
	);
}

export default function ChatPanel() {
	const { isOpen, close, messages, isLoading, addMessage, setLoading } =
		useChatStore();
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		if (isOpen) {
			scrollToBottom();
			setTimeout(() => inputRef.current?.focus(), 300);
		}
	}, [isOpen, scrollToBottom]);

	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);

	const handleSend = useCallback(() => {
		const text = input.trim();
		if (!text || isLoading) return;

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: text,
			timestamp: new Date(),
		};
		addMessage(userMessage);
		setInput("");
		setLoading(true);

		setTimeout(() => {
			const assistantMessage: ChatMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content:
					"Thank you for reaching out! Our team will get back to you shortly. In the meantime, feel free to ask any questions about flights, bookings, or our services.",
				timestamp: new Date(),
			};
			addMessage(assistantMessage);
			setLoading(false);
		}, 1500);
	}, [input, isLoading, addMessage, setLoading]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSend();
			}
		},
		[handleSend],
	);

	return (
		<>
			{/* Desktop panel */}
			<div
				className={`hidden lg:flex fixed top-0 right-0 h-full w-[400px] bg-white dark:bg-background-dark shadow-2xl border-l border-[#dde3df] dark:border-white/10 z-50 flex-col transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<PanelContent
					input={input}
					setInput={setInput}
					handleSend={handleSend}
					handleKeyDown={handleKeyDown}
					close={close}
					messages={messages}
					isLoading={isLoading}
					messagesEndRef={messagesEndRef}
					inputRef={inputRef}
				/>
			</div>

			{/* Mobile panel */}
			<div
				className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-background-dark shadow-2xl z-50 flex-col transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<PanelContent
					input={input}
					setInput={setInput}
					handleSend={handleSend}
					handleKeyDown={handleKeyDown}
					close={close}
					messages={messages}
					isLoading={isLoading}
					messagesEndRef={messagesEndRef}
					inputRef={inputRef}
				/>
			</div>
		</>
	);
}

function PanelContent({
	input,
	setInput,
	handleSend,
	handleKeyDown,
	close,
	messages,
	isLoading,
	messagesEndRef,
	inputRef,
}: {
	input: string;
	setInput: (val: string) => void;
	handleSend: () => void;
	handleKeyDown: (e: React.KeyboardEvent) => void;
	close: () => void;
	messages: ChatMessage[];
	isLoading: boolean;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
	inputRef: React.RefObject<HTMLInputElement | null>;
}) {
	return (
		<>
			<div className="flex items-center justify-between px-5 py-4 border-b border-[#dde3df] dark:border-white/10 shrink-0">
				<div className="flex items-center gap-3">
					<MessageCircle className="size-5 text-primary" />
					<h2 className="text-base font-bold text-[#121614] dark:text-white">
						Assistant Chat
					</h2>
				</div>
				<button
					type="button"
					onClick={close}
					className="p-1.5 rounded-lg hover:bg-surface-light dark:hover:bg-box-dark transition-colors cursor-pointer"
					aria-label="Close chat"
				>
					<X className="size-5 text-medium-gray dark:text-white/70" />
				</button>
			</div>

			<div className="flex-1 max-h-[calc(100vh-140.70px)] overflow-y-auto px-5 py-4">
				{messages.length === 0 && !isLoading && (
					<div className="flex flex-col items-center justify-center h-full text-center">
						<MessageCircle className="size-12 text-primary/30 mb-4" />
						<p className="text-medium-gray dark:text-white/60 text-sm font-medium">
							How can we help you today?
						</p>
						<p className="text-medium-gray dark:text-white/40 text-xs mt-1">
							Ask us anything about flights, bookings, or services.
						</p>
					</div>
				)}

				{messages.map((msg) => (
					<MessageBubble key={msg.id} message={msg} />
				))}

				{isLoading && <LoadingDots />}

				<div ref={messagesEndRef} />
			</div>

			<div className="shrink-0 border-t border-[#dde3df] dark:border-white/10 px-5 py-4">
				<div className="flex items-center gap-2">
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Type your message..."
						className="flex-1 h-11 px-4 rounded-xl bg-surface-light dark:bg-box-dark text-sm text-[#121614] dark:text-white placeholder:text-medium-gray border border-[#dde3df] dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
					/>
					<button
						type="button"
						onClick={handleSend}
						disabled={!input.trim() || isLoading}
						className="size-11 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
						aria-label="Send message"
					>
						<Send className="size-4" />
					</button>
				</div>
			</div>
		</>
	);
}
