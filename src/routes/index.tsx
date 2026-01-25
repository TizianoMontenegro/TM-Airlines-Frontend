import { createFileRoute } from "@tanstack/react-router";
import {
	GreenAngleRight,
	GreenCalendar,
	GreenPassenger,
	GreenPlaneArrival,
	GreenPlaneDeparture,
	LightArrowRight,
	LightCamera,
	LightGlobe,
	LightPlaneTop,
	LightShare,
	YellowMedal2,
} from "@/assets/icons";
// import logo from '../logo.svg'

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main>
			<section className="relative h-[650px] flex flex-col items-center justify-center px-4 overflow-hidden">
				<div
					className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
					data-alt="A breathtaking view of the Amalfi Coast with pastel buildings and turquoise water"
					style={{
						backgroundImage:
							'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBt4uBy8GE2e9c1DLHYdBCL99LtzVmKgXblKaQz3__fnt-_uUMd2f5oD1_Hi_8lGkWxHlQB8IS8tcEB7sgxpmaG-cUffzWsuzTEL15UH8kOT4-p3AolSdeGQEydf7PtE1uTu86pEZ-dC_u3IcyRnG9vCmZ-UXBDnUpqv3lAIPPHmXjNB9b3k8EbfNfQGmXTj3LScwHCi46_PawOZ9rAQBrV8_QH4nQE3mKcz5sRnwj7zoNU8nod56jQP_UXffzLH8AG1s5F0pBm1wY")',
					}}
				></div>
				<div className="relative z-10 text-center mb-10">
					<span className="inline-block bg-accent-red text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
						Premium Mediterranean Travel
					</span>
					<h2 className="text-white text-5xl md:text-7xl font-black mb-4 drop-shadow-lg tracking-tight">
						Experience the Soul of Italy
					</h2>
					<p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
						Fly across the heart of the Mediterranean with timeless elegance and
						Italian warmth.
					</p>
				</div>
				<div className="relative z-20 w-full max-w-5xl bg-white dark:bg-background-dark rounded-xl shadow-2xl p-6 md:p-8 mt-4 border border-white/20">
					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-6 border-b border-[#f1f4f2] dark:border-white/10 pb-4">
							<button
								type="button"
								className="text-primary dark:text-white font-bold text-sm border-b-2 border-primary pb-4 -mb-[17px]"
							>
								Round Trip
							</button>
							<button
								type="button"
								className="text-gray-500 font-medium text-sm hover:text-primary transition-colors pb-4 -mb-[17px]"
							>
								One Way
							</button>
							<button
								type="button"
								className="text-gray-500 font-medium text-sm hover:text-primary transition-colors pb-4 -mb-[17px]"
							>
								Multi-city
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<div className="relative">
								<label
									htmlFor="from"
									className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1"
								>
									From
								</label>
								<div className="flex items-center gap-2 border border-[#dde3df] dark:border-white/20 rounded-lg p-3 bg-[#fbfaf9] dark:bg-white/5 focus-within:border-primary">
									<GreenPlaneDeparture />
									{/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
									<input
										className="bg-transparent border-none p-0 focus:ring-0 w-full text-base font-semibold"
										placeholder="City or Airport"
										type="text"
										value="Rome (FCO)"
										id="from"
									/>
								</div>
							</div>
							<div className="relative">
								<label
									htmlFor="to"
									className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1"
								>
									To
								</label>
								<div className="flex items-center gap-2 border border-[#dde3df] dark:border-white/20 rounded-lg p-3 bg-[#fbfaf9] dark:bg-white/5 focus-within:border-primary">
									<GreenPlaneArrival />
									{/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
									<input
										className="bg-transparent border-none p-0 focus:ring-0 w-full text-base font-semibold"
										placeholder="Where to?"
										type="text"
										id="to"
									/>
								</div>
							</div>
							<div className="relative md:col-span-1">
								<label
									htmlFor="dates"
									className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1"
								>
									Dates
								</label>
								<div className="flex items-center gap-2 border border-[#dde3df] dark:border-white/20 rounded-lg p-3 bg-[#fbfaf9] dark:bg-white/5 focus-within:border-primary cursor-pointer">
									<GreenCalendar />
									<span className="text-base font-semibold">
										Oct 5 - Oct 12
									</span>
								</div>
							</div>
							<div className="relative">
								<label
									htmlFor="passengers"
									className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1"
								>
									Passengers
								</label>
								<div className="flex items-center gap-2 border border-[#dde3df] dark:border-white/20 rounded-lg p-3 bg-[#fbfaf9] dark:bg-white/5 focus-within:border-primary">
									<GreenPassenger />
									{/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
									<input
										className="bg-transparent border-none p-0 focus:ring-0 w-full text-base font-semibold"
										readOnly
										type="text"
										value="1 Adult, Economy"
										id="passengers"
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-end">
							<button
								type="button"
								className="bg-primary hover:bg-[#1a4d2b] text-white px-10 py-4 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
							>
								<span>Search Flights</span>
								<LightArrowRight />
							</button>
						</div>
					</div>
				</div>
			</section>
			<section className="max-w-[1280px] mx-auto px-6 lg:px-20 py-24">
				<div className="flex items-end justify-between mb-12">
					<div>
						<h3 className="text-accent-red font-bold tracking-widest text-xs uppercase mb-2">
							Discover Our Heritage
						</h3>
						<h2 className="text-4xl font-black text-primary dark:text-white">
							Top Italian Destinations
						</h2>
					</div>
					<a
						className="text-primary font-bold flex items-center gap-1 group"
						href="/"
					>
						View all routes
						<GreenAngleRight />
					</a>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="group cursor-pointer">
						<div className="relative h-[400px] overflow-hidden rounded-xl mb-4">
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
								data-alt="The Colosseum in Rome during sunset"
								style={{
									backgroundImage:
										'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6NLN3GUw7tBc63G0jQQlNx50ssJSXqL1G3x_VMkvrrxcTKhzwe0WZA_IBWHtniNtrK8T5Gb45Ta4x31oJqf_lKOLfYvc9_DKTDNi5tdFC0OL-IdyZWlNhkSHc8DtE6oAlrjVGBXjk17I1PBBsy5GQ-9s0rK8mdHywA-aCm_4e-XbYBAx0dcbhfhsmLxOzqeeCrHdU2rb9Iq_CA8jW_zdUiwekyDwXUZ8noDoBSlp95pHfTbH4U8OTyBtjWoaGDkImZ5tay15G7XE")',
								}}
							></div>
							<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
							<div className="absolute bottom-6 left-6 text-white">
								<p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
									The Eternal City
								</p>
								<h4 className="text-2xl font-bold">Rome</h4>
							</div>
							<div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold">
								From €89
							</div>
						</div>
					</div>
					<div className="group cursor-pointer">
						<div className="relative h-[400px] overflow-hidden rounded-xl mb-4">
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
								data-alt="Venice canals with gondolas"
								style={{
									backgroundImage:
										'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuCsxPsO_hWNHXogaAQ2vV2dyI6opDXzuRfuQORbUaL83AhHmY-zQbfBDhfmPMHnJl86WE_69Bn-6HvESJlGVks6coWCyoI00RH17EyRqnqOvbo8IG1bI8Px9l_w08-5jOZrlcLOU5Uf92A_3irZSvO-4U3X4MgeypJXyNDhhoov19XSGwV86Gi6OC4QqAHesvIPmWtjYc4ew9Uvoj8xMIzpGc-dKI4R31lnKkvwRPJAe1Mf2x6Vks5YZA0opNWw5qdY5Kdcwm4T8")',
								}}
							></div>
							<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
							<div className="absolute bottom-6 left-6 text-white">
								<p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
									The Floating Masterpiece
								</p>
								<h4 className="text-2xl font-bold">Venice</h4>
							</div>
							<div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold">
								From €115
							</div>
						</div>
					</div>
					<div className="group cursor-pointer">
						<div className="relative h-[400px] overflow-hidden rounded-xl mb-4">
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
								data-alt="Florence Duomo cathedral at night"
								style={{
									backgroundImage:
										'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAihE6S4RGB6oVTCv8hdwks1KOM00-EIV2x5B87OdnC4cPJ6lHGEPRV_ETzkjWOBo0sDp69UW47QHoKwVjft6WTdF4u-UQWy2pK9owWm9qF86jpOdBu2HFE6eBtzjJ9kwiTXYUC6XGapWgUnGfC7DMekfRw2G5QuT5oWrS1s6SpFcNrU_llJah3F3oABJ9vDsLnqRLHAVRfTru6PTCbdRG2BgqK3X0Ny5hlu64TBgDT591ck9LzHxsypLnBTjDo0C2dk0-5tneG-M")',
								}}
							></div>
							<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
							<div className="absolute bottom-6 left-6 text-white">
								<p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
									Cradle of Renaissance
								</p>
								<h4 className="text-2xl font-bold">Florence</h4>
							</div>
							<div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold">
								From €99
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-primary py-20 overflow-hidden">
				<div className="max-w-[1280px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
					<div className="text-white">
						<div className="flex items-center gap-2 text-gold mb-6">
							<YellowMedal2 />
							<span className="text-sm font-bold uppercase tracking-[0.2em]">
								Loyalty Reimagined
							</span>
						</div>
						<h2 className="text-5xl font-black mb-6 leading-tight">
							MilleMiglia: Your Passport to Italian Luxury
						</h2>
						<p className="text-white/80 text-lg mb-10 leading-relaxed max-w-lg">
							Unlock a world of exclusive benefits, from lounge access in Rome
							to priority boarding and extra luggage. Join the millions who fly
							the Italian way.
						</p>
						<div className="flex flex-wrap gap-4">
							<button
								type="button"
								className="bg-gold text-primary font-bold px-8 py-4 rounded-lg hover:bg-white transition-all shadow-xl shadow-black/20"
							>
								Join for Free
							</button>
							<button
								type="button"
								className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all"
							>
								Learn More
							</button>
						</div>
					</div>
					<div className="relative">
						<div className="absolute -top-10 -right-10 size-64 bg-gold/10 rounded-full blur-3xl"></div>
						<div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
							<div
								className="aspect-video bg-cover bg-center"
								data-alt="Premium airline lounge interior"
								style={{
									backgroundImage:
										'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuYES2ViTBn6gjamxaI0XUHR1qSDXYPWR8wvzb0gXOJrs1XnkQZvBwPiW_pu-SIxdFPUYdPsc0yq0kUA8hREy0CB1HdIxDlZe8qXF9kMK8e_Yh91CqTlXlPa4hG2Edhqd1ey6JQgImKA-PJiYHHfHy4dsSyaq7PPPo09BPYQwZgGn__wAZxvWpalu2BiIimi6R24FHwroBpO5m95Xv4Qj1zWDlY5BYAYdTUFLQLDWm41LEunMSTqcpHCdsl8vYeOpNa7xYcHrZ6ZA")',
								}}
							></div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
