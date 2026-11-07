import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as formatMoney, o as useDocTitle, r as formatDate, s as useI18n } from "./i18n-CU4myw4a.mjs";
import { n as Field, o as cn, r as LangSwitch, t as Button } from "./shell-LyhWjmUC.mjs";
import { a as demoChildren, t as AppLayout } from "./events-DsDvDyX8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parametres-D-JVG9rg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { t, lang } = useI18n();
	useDocTitle(t.meta.settings);
	const [tab, setTab] = (0, import_react.useState)("profile");
	const [note, setNote] = (0, import_react.useState)("");
	const [color, setColor] = (0, import_react.useState)("a");
	const [children, setChildren] = (0, import_react.useState)(demoChildren);
	const [first, setFirst] = (0, import_react.useState)("");
	const [birth, setBirth] = (0, import_react.useState)("");
	const [childErr, setChildErr] = (0, import_react.useState)("");
	const [invite, setInvite] = (0, import_react.useState)("");
	const [inviteErr, setInviteErr] = (0, import_react.useState)("");
	const flash = (m) => {
		setNote(m);
		setTimeout(() => setNote(""), 3e3);
	};
	const addChild = (e) => {
		e.preventDefault();
		if (!first.trim() || !birth) return setChildErr(t.settings.childRequired);
		setChildErr("");
		setChildren((c) => [...c, {
			id: crypto.randomUUID(),
			firstName: first.trim().slice(0, 50),
			birthDate: birth
		}]);
		setFirst("");
		setBirth("");
	};
	const sendInvite = (e) => {
		e.preventDefault();
		if (!/^\S+@\S+\.\S+$/.test(invite)) return setInviteErr(t.login.invalidEmail);
		setInviteErr("");
		setInvite("");
		flash(t.settings.inviteSent);
	};
	const starter = t.pricing.plans[0];
	const paid = t.pricing.plans.slice(1);
	const checkout = (_plan) => flash(t.settings.demoBilling);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		active: "settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: t.settings.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					className: "mt-6 flex gap-1 rounded-xl border bg-secondary/50 p-1",
					children: [
						"profile",
						"billing",
						"team"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						role: "tab",
						type: "button",
						"aria-selected": tab === k,
						onClick: () => setTab(k),
						className: cn("flex-1 rounded-lg px-3 py-2 text-sm font-medium", tab === k ? "bg-card text-foreground" : "text-muted-foreground"),
						children: t.settings.tabs[k]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-2xl border bg-card p-6",
					children: [
						tab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-5",
							onSubmit: (e) => {
								e.preventDefault();
								flash(t.settings.saved);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t.settings.name,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										defaultValue: "Camille",
										className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t.settings.email,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										defaultValue: t.settings.demoEmail,
										className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
									}, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium text-muted-foreground",
										children: t.settings.color
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-3",
										children: ["a", "b"].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": color === c,
											onClick: () => setColor(c),
											"aria-label": c === "a" ? t.settings.colorA : t.settings.colorB,
											className: cn("h-9 w-9 rounded-full", c === "a" ? "bg-parent-a" : "bg-parent-b", color === c && "ring-2 ring-foreground ring-offset-2 ring-offset-card")
										}, c))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-sm font-medium text-muted-foreground",
										children: t.settings.language
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									children: t.settings.save
								})
							]
						}),
						tab === "billing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: t.settings.currentPlan
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xl font-semibold",
								children: [
									starter.name,
									" · ",
									t.pricing.free
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-2 sm:flex-row",
								children: paid.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: p.id === "pro" ? "primary" : "outline",
									onClick: () => checkout(p.id),
									children: [
										t.settings.upgrade,
										" ",
										p.name,
										" · ",
										formatMoney(p.price, lang),
										t.pricing.perMonth
									]
								}, p.id))
							})]
						}),
						tab === "team" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: sendInvite,
								className: "space-y-3",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-semibold",
										children: t.settings.invite
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: t.settings.inviteHelp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 sm:flex-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: invite,
											onChange: (e) => setInvite(e.target.value),
											placeholder: t.login.placeholder,
											className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "shrink-0",
											children: t.settings.inviteSend
										})]
									}),
									inviteErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: inviteErr
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-semibold",
										children: t.settings.children
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "divide-y rounded-xl border",
										children: children.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex justify-between px-4 py-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: c.firstName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													t.settings.born,
													" ",
													formatDate(/* @__PURE__ */ new Date(c.birthDate + "T00:00:00"), lang)
												]
											})]
										}, c.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: addChild,
										className: "grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: t.settings.firstName,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: first,
													maxLength: 50,
													onChange: (e) => setFirst(e.target.value),
													className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: t.settings.birthDate,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													value: birth,
													onChange: (e) => setBirth(e.target.value),
													className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												children: t.settings.addChild
											})
										]
									}),
									childErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: childErr
									})
								]
							})]
						})
					]
				}),
				note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "mt-4 text-sm text-success",
					children: note
				})
			]
		})
	});
}
//#endregion
export { SettingsPage as component };
