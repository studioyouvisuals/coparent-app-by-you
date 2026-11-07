import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as formatMoney, o as useDocTitle, s as useI18n } from "./i18n-CU4myw4a.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as btn, i as Logo, o as cn, r as LangSwitch } from "./shell-LyhWjmUC.mjs";
import { _ as CalendarDays, g as Check, i as ShieldCheck, l as Plane, n as Trophy, o as School, s as ReceiptText } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D3k6Posw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = [
	CalendarDays,
	Plane,
	ReceiptText,
	School,
	Trophy,
	ShieldCheck
];
function Landing() {
	const { t, lang } = useI18n();
	useDocTitle(t.meta.home);
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b bg-background/80 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden gap-7 text-sm text-muted-foreground md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#features",
									className: "hover:text-foreground",
									children: t.nav.features
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#pricing",
									className: "hover:text-foreground",
									children: t.nav.pricing
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#faq",
									className: "hover:text-foreground",
									children: t.nav.faq
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/connexion",
								className: "hidden text-sm font-medium sm:inline",
								children: t.nav.login
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-5 pb-20 pt-20 text-center sm:pt-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 inline-block rounded-full border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground",
							children: t.hero.eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-balance text-5xl font-semibold tracking-[-0.03em] sm:text-7xl",
							children: t.hero.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-2xl text-balance text-xl text-muted-foreground sm:text-2xl",
							children: t.hero.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/connexion",
								className: btn(),
								children: t.hero.cta
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/tableau-de-bord",
								className: btn("outline"),
								children: t.hero.secondary
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroPreview, {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "features",
				className: "mx-auto max-w-6xl px-5 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-balance text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl",
						children: t.features.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-lg text-muted-foreground",
						children: t.features.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: t.features.items.map((f, i) => {
							const Icon = icons[i] ?? CalendarDays;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border bg-card p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 font-semibold",
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: f.text
									})
								]
							}, f.title);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "pricing",
				className: "mx-auto max-w-6xl px-5 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-balance text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl",
						children: t.pricing.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-center text-lg text-muted-foreground",
						children: t.pricing.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-4 md:grid-cols-3",
						children: t.pricing.plans.map((p) => {
							const hl = p.id === "pro";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("relative flex flex-col rounded-2xl border bg-card p-7", hl && "border-primary shadow-glow"),
								children: [
									hl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 left-7 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground",
										children: t.pricing.popular
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: p.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-6 text-4xl font-semibold tracking-tight",
										children: [p.price === 0 ? t.pricing.free : formatMoney(p.price, lang), p.price > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-normal text-muted-foreground",
											children: t.pricing.perMonth
										})]
									}),
									p.id === "pro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: t.pricing.perFamily
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 flex-1 space-y-3 text-sm",
										children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0 text-primary" }), f]
										}, f))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/connexion",
										className: cn(btn(hl ? "primary" : "outline"), "mt-8"),
										children: t.pricing.choose
									})
								]
							}, p.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "faq",
				className: "mx-auto max-w-3xl px-5 py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-balance text-center text-4xl font-semibold tracking-[-0.02em] sm:text-5xl",
					children: t.faq.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 divide-y rounded-2xl border bg-card",
					children: t.faq.items.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setOpen(open === i ? null : i),
						"aria-expanded": open === i,
						className: "flex w-full items-center justify-between px-6 py-5 text-left font-medium",
						children: [f.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: open === i ? "−" : "+"
						})]
					}), open === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-6 pb-5 text-sm leading-relaxed text-muted-foreground",
						children: f.a
					})] }, f.q))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-5 py-24 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-5xl",
						children: t.cta.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/connexion",
						className: cn(btn(), "mt-10"),
						children: t.cta.button
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ",
							t.brand,
							". ",
							t.footer.rights
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.footer.privacy }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.footer.terms })]
						})
					]
				})
			})
		]
	});
}
function HeroPreview() {
	const days = Array.from({ length: 28 }, (_, i) => i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "mx-auto mt-16 max-w-2xl rounded-2xl border bg-card/70 p-5 shadow-glow backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 gap-1.5",
			children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("aspect-square rounded-lg", Math.floor(d / 7) % 2 ? "bg-parent-b/25" : "bg-parent-a/30", d === 9 && "ring-2 ring-primary") }, d))
		})
	});
}
//#endregion
export { Landing as component };
