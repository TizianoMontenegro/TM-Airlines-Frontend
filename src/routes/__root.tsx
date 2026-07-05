import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "@/components/Footer";
import ChatAssistant from "@/features/ChatAssistant/components/ChatAssistant";
import Header from "../components/Header";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
	head: () => ({
		meta: [],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: () => (
		<div className="font-display bg-background-light text-[#121614] dark:bg-background-dark dark:text-white transition-colors duration-300">
			<Header />
			<Outlet />
			<ChatAssistant />
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
			<Footer />
		</div>
	),
});
