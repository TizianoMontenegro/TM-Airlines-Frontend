import { LightCamera, LightGlobe, LightPlaneTop, LightShare } from "@/assets/icons";

export const Footer = () => {
	return (
		<footer className="bg-white dark:bg-background-dark border-t border-[#dde3df] dark:border-white/10 pt-20 pb-10">
			<div className="max-w-[1280px] mx-auto px-6 lg:px-20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
					<div>
						<div className="flex items-center gap-2 mb-8">
							<div className="text-primary dark:text-white">
								<svg
									className="size-6"
									fill="none"
									viewBox="0 0 48 48"
									xmlns="http://www.w3.org/2000/svg"
									aria-label="TM Airlines Logo"
								>
									<title>TM Airlines Logo</title>
									<path
										clip-rule="evenodd"
										d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
										fill="currentColor"
										fill-rule="evenodd"
									></path>
								</svg>
							</div>
							<h4 className="text-xl font-black text-primary dark:text-white uppercase tracking-tighter">
								TM Airlines
							</h4>
						</div>
						<p className="text-gray-500 text-sm leading-relaxed mb-6">
							The heartbeat of Italian aviation, connecting the world to the
							timeless beauty of Italy since 1946.
						</p>
						<div className="flex gap-4">
							<a
								className="size-10 rounded-full bg-[#f1f4f2] dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
								href="/language/"
							>
								<LightGlobe />
							</a>
							<a
								className="size-10 rounded-full bg-[#f1f4f2] dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
								href="/photo_camera/"
							>
								<LightCamera />
							</a>
							<a
								className="size-10 rounded-full bg-[#f1f4f2] dark:bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
								href="/share/"
							>
								<LightShare />
							</a>
						</div>
					</div>
					<div>
						<h5 className="font-bold mb-8 text-primary dark:text-white">
							Plan &amp; Book
						</h5>
						<ul className="space-y-4 text-sm text-gray-500 font-medium">
							<li>
								<a
									className="hover:text-primary"
									href="/booking/flight-status/"
								>
									Flight Status
								</a>
							</li>
							<li>
								<a
									className="hover:text-primary"
									href="/booking/special-offers/"
								>
									Special Offers
								</a>
							</li>
							<li>
								<a className="hover:text-primary" href="/booking/baggage-info/">
									Baggage Info
								</a>
							</li>
							<li>
								<a
									className="hover:text-primary"
									href="/booking/travel-insurance/"
								>
									Travel Insurance
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="font-bold mb-8 text-primary dark:text-white">
							Experience
						</h5>
						<ul className="space-y-4 text-sm text-gray-500 font-medium">
							<li>
								<a
									className="hover:text-primary"
									href="/experience/on-board-meals/"
								>
									On Board Meals
								</a>
							</li>
							<li>
								<a className="hover:text-primary" href="/experience/our-fleet/">
									Our Fleet
								</a>
							</li>
							<li>
								<a
									className="hover:text-primary"
									href="/experience/cabin-classes/"
								>
									Cabin Classes
								</a>
							</li>
							<li>
								<a
									className="hover:text-primary"
									href="/experience/italian-lounges/"
								>
									Italian Lounges
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h5 className="font-bold mb-8 text-primary dark:text-white">
							Newsletter
						</h5>
						<p className="text-sm text-gray-500 mb-6">
							Get special offers and travel inspiration.
						</p>
						<div className="flex">
							<input
								className="w-full bg-[#f1f4f2] dark:bg-white/5 border-none rounded-l-lg px-4 py-3 focus:ring-1 focus:ring-primary text-sm"
								placeholder="Email address"
								type="email"
							/>
							<button
								type="button"
								className="bg-primary text-white px-4 rounded-r-lg hover:bg-opacity-90 transition-all flex items-center justify-center"
							>
								<LightPlaneTop />
							</button>
						</div>
					</div>
				</div>
				<div className="border-t border-[#f1f4f2] dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
					<p className="text-xs text-gray-400">
						© 2026 TM Airlines S.p.A. - All Rights Reserved
					</p>
					<div className="flex gap-6">
						<a
							className="text-xs text-gray-400 hover:text-primary"
							href="/legal/privacy-policy/"
						>
							Privacy Policy
						</a>
						<a
							className="text-xs text-gray-400 hover:text-primary"
							href="/legal/terms-of-use/"
						>
							Terms of Use
						</a>
						<a
							className="text-xs text-gray-400 hover:text-primary"
							href="/legal/cookie-settings/"
						>
							Cookie Settings
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
