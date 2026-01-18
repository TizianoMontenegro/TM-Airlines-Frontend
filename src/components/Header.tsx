import { Link } from "@tanstack/react-router";
import { Home, Menu, X } from "lucide-react";
import { useId, useState } from "react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="italy-gradient"></div>
			<header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-[#dde3df] dark:border-white/10 px-6 lg:px-20 py-4">
				<button hidden
          type="button"
					onClick={() => setIsOpen(true)}
					className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>

				<div className="max-w-[1280px] mx-auto flex items-center justify-between">

					<a href="/" className="flex items-center gap-3">
						<div className="text-primary dark:text-white">
							<svg
								className="size-8"
								fill="none"
								viewBox="0 0 48 48"
								xmlns="http://www.w3.org/2000/svg"
								aria-labelledby="logo-title"
							>
								<title id={useId()}>TM Airlines Logo</title>
								<path
									clip-rule="evenodd"
									d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
									fill="currentColor"
									fill-rule="evenodd"
								></path>
							</svg>
						</div>
						<h1 className="text-2xl font-extrabold tracking-tighter text-primary dark:text-white uppercase">
							TM Airlines
						</h1>
					</a>

					<nav className="hidden md:flex items-center gap-10">
            
						<div className="relative group">
							<button
								type="button"
								className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1"
							>
								Flights{" "}
								<span className="material-symbols-outlined text-xs">
									expand_more
								</span>
							</button>
							<div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
								<a
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
									href="/flights/search"
								>
									Search
								</a>
								<a
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
									href="/flights/destinations"
								>
									Destinations
								</a>
							</div>
						</div>

						<div className="relative group">
							<button
								type="button"
								className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1"
							>
								Manage Booking{" "}
								<span className="material-symbols-outlined text-xs">
									expand_more
								</span>
							</button>
							<div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
								<div className="space-y-3">
									<input
										className="w-full text-xs border-gray-200 rounded p-2"
										placeholder="Booking code"
										type="text"
									/>
									<input
										className="w-full text-xs border-gray-200 rounded p-2"
										placeholder="Last name"
										type="text"
									/>
									<button
										type="button"
										className="w-full bg-primary text-white text-xs font-bold py-2 rounded"
									>
										Find Booking
									</button>
								</div>
							</div>
						</div>
						<div className="relative group">
							<button
								type="button"
								className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1"
							>
								Support{" "}
								<span className="material-symbols-outlined text-xs">
									expand_more
								</span>
							</button>
							<div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
								<a
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
									href="/support/rag/"
								>
									{/* RAG-powered help */}
									AI Assistance
								</a>
								<a
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
									href="/support/faqs/"
								>
									FAQs
								</a>
							</div>
						</div>
						<a
							className="text-sm font-semibold text-gold flex items-center gap-1"
							href="/premium/"
						>
							<span className="material-symbols-outlined text-sm">
								workspace_premium
							</span>
							MilleMiglia
						</a>
					</nav>

					<div className="flex items-center gap-4">
						<a
							href="/auth/login/"
							className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold tracking-wide hover:bg-opacity-90 transition-all"
						>
							Login
						</a>
						<div
							className="size-10 rounded-full border-2 border-primary/20 bg-cover bg-center"
							data-alt="User profile placeholder"
							style={{
								backgroundImage:
									'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhKvk3yQTgxw_Sae2K5lCf7TwrYTWMFwZ8TpXjo_87stLyfGjoxz_eBa_frFXxHBlVdQgoxJpo8auFRM_FfWUtvA0vztgIm4L6EeBbF9EPllkOEmEGZty5cSxW9CayaisIVLwFlL0U92P99YAcknU2A7DYs1sTeAX3FeiiwggzglliqffzggiyPXULR3NBM9eKDFUATVNHPXrlBlFIXUxia6Ncjx8aH9NIWsiUFzkBZUj8lxcKhVON_uVVlDoU4hMZ540bh-lg77Q")',
							}}
						></div>
					</div>
				</div>
			</header>

			<aside hidden
				className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-bold">Navigation</h2>
					<button
            type="button"
						onClick={() => setIsOpen(false)}
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
						aria-label="Close menu"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						to="/"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
						}}
					>
						<Home size={20} />
						<span className="font-medium">Home</span>
					</Link>

					{/* Demo Links Start */}

					{/* Demo Links End */}
				</nav>
			</aside>
		</>
	);
}
