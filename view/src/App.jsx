import { useMemo, useState } from "react";

export default function App() {
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);
	const [raw, setRaw] = useState(null); // parsed JSON
	const [error, setError] = useState("");

	const endpoint = `${import.meta.env.VITE_API_URL}/generate`;

	const bulletItems = useMemo(() => {
		if (!raw || typeof raw !== "object") return [];

		const t = raw.alternateTimeline ?? raw.alternate_timeline;
		if (t && typeof t === "object") {
			return [
				{
					title: "Political changes",
					text: t.politicalChanges ?? t.political_changes,
				},
				{
					title: "Technology shifts",
					text: t.technologyShifts ?? t.technology_shifts,
				},
				{
					title: "Cultural impact",
					text: t.culturalImpact ?? t.cultural_impact,
				},
				{
					title: "Modern world differences",
					text: t.modernWorldDifferences ?? t.modern_world_differences,
				},
			].filter((x) => x.text && String(x.text).trim().length);
		}

		return Object.entries(raw).map(([k, v]) => ({
			title: k,
			text: typeof v === "string" ? v : JSON.stringify(v, null, 2),
		}));
	}, [raw]);

	async function handleSubmit() {
		setError("");
		setRaw(null);

		const trimmed = prompt.trim();
		if (!trimmed) return;

		setLoading(true);
		try {
			const res = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text: trimmed }),
			});

			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err?.error || `Request failed (${res.status})`);
			}

			const data = await res.json();
			setRaw(data);
		} catch (e) {
			setError(e?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	function onKeyDown(e) {
		// Submit on Enter, allow newline with Shift+Enter
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	return (
		<div className='min-h-dvh bg-gradient-to-b from-gray-50 to-gray-200'>
			{/* Top bar */}
			<header className='sticky top-0 z-10 border-b border-black/5 bg-white/70 backdrop-blur-xl'>
				<div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
					<div className='flex items-center gap-3'>
						<div className='h-10 w-10 bg-transparent'>
							{/* <span className='text-sm font-black'>AI</span> */}
							<img src='/questionmark.png' alt='LOGO' />
						</div>
						<div>
							<p className='text-sm font-semibold text-gray-900'>WHAT IF ...</p>
							<p className='text-xs text-gray-500'>
								Ask about an alternative reality
							</p>
						</div>
					</div>

					<div className='hidden sm:flex items-center gap-2 text-xs text-gray-500'>
						<span className='rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm'>
							POST {endpoint}
						</span>
					</div>
				</div>
			</header>

			{/* Main */}
			<main className='mx-auto max-w-5xl px-6 py-10'>
				{/* Input card */}
				<section className='rounded-3xl border border-black/5 bg-white/70 p-6 shadow-xl backdrop-blur-xl'>
					<div className='flex flex-col gap-4 md:flex-row md:items-end'>
						<div className='flex-1'>
							<label className='mb-2 block text-sm font-semibold text-gray-900 ml-2'>
								Ask away
							</label>

							<div className='relative'>
								<textarea
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									onKeyDown={onKeyDown}
									placeholder='Ask away… (Press Enter to send, Shift+Enter for newline)'
									className='w-full h-28 resize-none rounded-2xl border border-gray-200 bg-white/80 px-5 py-4
                             text-gray-900 placeholder:text-gray-400 shadow-lg outline-none
                             transition duration-300 ease-out
                             focus:border-black focus:ring-4 focus:ring-black/10
                             hover:shadow-xl'
								/>
								<div className='pointer-events-none absolute bottom-3 right-4 text-xs text-gray-400'>
									{prompt.trim().length}/280
								</div>
							</div>

							<p className='mt-2 text-xs text-gray-500'>
								Tip: Keep it short i.e: "What if internet didn't exist?"
							</p>
						</div>

						<button
							onClick={handleSubmit}
							disabled={loading || !prompt.trim()}
							className='group inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4
                         text-sm font-semibold text-white shadow-xl
                         transition duration-300 ease-out
                         hover:bg-black/90 hover:shadow-2xl
                         disabled:cursor-not-allowed disabled:opacity-60'
						>
							{loading ? (
								<>
									<span className='h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
									Generating…
								</>
							) : (
								<>
									Generate
									<span className='translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5'>
										→
									</span>
								</>
							)}
						</button>
					</div>
				</section>

				{/* Error */}
				{error ? (
					<div className='mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow'>
						{error}
					</div>
				) : null}

				{/* Output */}
				<section className='mt-8'>
					<div className='flex items-center justify-between'>
						<h2 className='text-lg font-extrabold text-gray-900'>Result</h2>
						{raw ? (
							<span className='text-xs text-gray-500'>
								Parsed JSON • {bulletItems.length} items
							</span>
						) : null}
					</div>

					{!raw && !loading ? (
						<div className='mt-3 rounded-3xl border border-black/5 bg-white/60 p-10 text-center text-sm text-gray-500 shadow-lg backdrop-blur-xl'>
							Your result will appear here.
						</div>
					) : null}

					{loading ? (
						<div className='mt-3 rounded-3xl border border-black/5 bg-white/60 p-6 shadow-lg backdrop-blur-xl'>
							<div className='h-6 w-56 animate-pulse rounded bg-gray-200' />
							<div className='mt-5 space-y-3'>
								<div className='h-4 w-full animate-pulse rounded bg-gray-100' />
								<div className='h-4 w-11/12 animate-pulse rounded bg-gray-100' />
								<div className='h-4 w-10/12 animate-pulse rounded bg-gray-100' />
								<div className='h-4 w-9/12 animate-pulse rounded bg-gray-100' />
							</div>
						</div>
					) : null}

					{raw ? (
						<div className='mt-3 grid gap-4'>
							<div className='rounded-3xl border border-black/5 bg-white/70 shadow-xl backdrop-blur-xl overflow-hidden'>
								<div className='bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-5'>
									<p className='text-xs font-semibold text-gray-200'>
										Scenario
									</p>
									<h3 className='mt-1 text-xl font-extrabold tracking-tight text-white'>
										{raw?.alternateTimeline?.name ??
											raw?.alternate_timeline?.scenario ??
											raw?.alternate_timeline?.name ??
											"AI Output"}
									</h3>
								</div>

								<div className='p-6'>
									<ul className='space-y-4'>
										{bulletItems.map((item, idx) => (
											<li
												key={idx}
												className='group rounded-2xl border border-gray-100 bg-gray-50 p-4
                                   shadow-sm transition duration-300 ease-out
                                   hover:shadow-md hover:-translate-y-0.5'
											>
												<div className='flex items-start gap-3'>
													<span className='mt-2 h-2.5 w-2.5 rounded-full bg-gray-900 flex-shrink-0' />
													<div className='min-w-0'>
														<p className='font-bold text-gray-900'>
															{item.title}
														</p>
														<p className='mt-1 text-sm leading-relaxed text-gray-700'>
															{item.text}
														</p>
													</div>
												</div>
											</li>
										))}
									</ul>

									{/* Optional: show raw JSON */}
									<details className='mt-6 rounded-2xl border border-gray-200 bg-white px-4 py-3'>
										<summary className='cursor-pointer text-sm font-semibold text-gray-900'>
											View raw JSON
										</summary>
										<pre className='mt-3 overflow-auto rounded-xl bg-gray-50 p-4 text-xs text-gray-800'>
											{JSON.stringify(raw, null, 2)}
										</pre>
									</details>
								</div>
							</div>
						</div>
					) : null}
				</section>
			</main>

			{/* Footer */}
			<footer className='mx-auto max-w-5xl px-6 pb-10 pt-6 text-xs text-gray-500'>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
					<p>Gemini says hi from behind the scenes</p>
					<p className='text-gray-400'>Alif OP</p>
				</div>
			</footer>
		</div>
	);
}
