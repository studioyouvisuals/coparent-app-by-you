import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as formatMonth, i as formatMoney, n as eventTitle, o as useDocTitle, r as formatDate, s as useI18n } from "./i18n-CU4myw4a.mjs";
import { n as Field, o as cn, s as inputCls, t as Button } from "./shell-LyhWjmUC.mjs";
import { c as Plus, g as Check, h as ChevronLeft, m as ChevronRight, p as Clock, t as X, u as MapPin } from "../_libs/lucide-react.mjs";
import { a as demoChildren, c as initialStatus, i as custodyParent, l as parents, n as activityKinds, o as demoEvents, r as canDecide, s as eventTypes, t as AppLayout, u as toIso } from "./events-DsDvDyX8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tableau-de-bord-8OyBNbiZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var parentBg = (id) => id === "p1" ? "bg-parent-a/25" : "bg-parent-b/20";
var parentDot = (id) => id === "p1" ? "bg-parent-a" : "bg-parent-b";
var parentName = (id) => parents.find((p) => p.id === id)?.name ?? "";
var statusCls = {
	propose: "bg-primary/20 text-primary",
	valide: "bg-success/15 text-success",
	fait: "bg-success/15 text-success",
	refuse: "bg-destructive/15 text-destructive"
};
function Dashboard() {
	const { t, lang } = useI18n();
	useDocTitle(t.meta.dashboard);
	const [today, setToday] = (0, import_react.useState)(null);
	const [month, setMonth] = (0, import_react.useState)(null);
	const [events, setEvents] = (0, import_react.useState)([]);
	const [section, setSection] = (0, import_react.useState)("calendar");
	const [me, setMe] = (0, import_react.useState)("p1");
	const [modal, setModal] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		setToday(d);
		setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
		setEvents(demoEvents(d));
	}, []);
	const flash = (m) => {
		setToast(m);
		setTimeout(() => setToast(""), 3500);
	};
	const decide = (id, status) => {
		setEvents((prev) => prev.map((e) => e.id === id ? {
			...e,
			status
		} : e));
		flash(status === "valide" ? t.dashboard.approved : t.dashboard.declined);
	};
	const upcoming = (0, import_react.useMemo)(() => {
		if (!today) return [];
		const iso = toIso(today);
		return events.filter((e) => e.date >= iso && (section === "calendar" || e.type === section)).sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? "")).slice(0, 6);
	}, [
		events,
		today,
		section
	]);
	if (!today || !month) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {
		active: section,
		onSection: setSection,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
	});
	const first = (month.getDay() + 6) % 7;
	const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
	const cells = [...Array(first).fill(null), ...Array.from({ length: daysIn }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
	const week = custodyParent(today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, {
		active: section,
		onSection: setSection,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							t.dashboard.thisWeek,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 inline-flex items-center gap-2 font-semibold text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2.5 w-2.5 rounded-full", parentDot(week)) }), parentName(week)]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							role: "group",
							"aria-label": t.dashboard.viewAs,
							className: "inline-flex items-center gap-1 rounded-full border bg-secondary p-0.5 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-2 text-muted-foreground",
								children: t.dashboard.viewAs
							}), parents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": me === p.id,
								onClick: () => setMe(p.id),
								className: cn("rounded-full px-3 py-1 transition-colors", me === p.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
								children: p.name
							}, p.id))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setModal(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), t.dashboard.add]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 lg:grid-cols-[1fr_340px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border bg-card p-4 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-lg font-semibold capitalize",
									children: formatMonth(month, lang)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t.dashboard.prev,
										onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1)),
										className: "rounded-lg p-2 hover:bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t.dashboard.next,
										onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1)),
										className: "rounded-lg p-2 hover:bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground",
								children: t.weekdays.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "py-1",
									children: w
								}, w))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 grid grid-cols-7 gap-1",
								children: cells.map((d, i) => {
									if (!d) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `x${i}`);
									const iso = toIso(d);
									const dayEvents = events.filter((e) => e.date === iso && e.status !== "refuse");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("flex aspect-square flex-col rounded-lg p-1 text-xs sm:p-1.5 sm:text-sm", parentBg(custodyParent(d)), iso === toIso(today) && "ring-2 ring-primary"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: d.getDate()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-auto flex flex-wrap gap-0.5",
											children: dayEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												title: eventTitle(e, t),
												className: cn("h-1.5 w-1.5 rounded-full", e.type === "activite" ? "bg-success" : "bg-foreground")
											}, e.id))
										})]
									}, iso);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground",
								children: parents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-3 w-3 rounded", parentDot(p.id)) }), p.name]
								}, p.id))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "rounded-2xl border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: t.dashboard.upcoming
								}), section !== "calendar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSection("calendar"),
									className: "text-xs text-primary",
									children: t.dashboard.all
								})]
							}),
							section !== "calendar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									t.dashboard.filtered,
									" ",
									t.types[section]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-3",
								children: [upcoming.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-sm text-muted-foreground",
									children: t.dashboard.noEvents
								}), upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("rounded-xl border bg-secondary/40 p-3", e.status === "refuse" && "opacity-60"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												formatDate(/* @__PURE__ */ new Date(e.date + "T00:00:00"), lang),
												" ·",
												" ",
												e.kind ? t.kinds[e.kind] : t.types[e.type]
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-full px-2 py-0.5", statusCls[e.status]),
												children: t.status[e.status]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("mt-1.5 text-sm font-medium", e.status === "refuse" && "line-through"),
											children: eventTitle(e, t)
										}),
										(e.time || e.place) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground",
											children: [e.time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), e.time]
											}), e.place && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), e.place]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", parentDot(e.parentId)) }),
												demoChildren.find((c) => c.id === e.childId)?.firstName,
												" ",
												t.dashboard.with,
												" ",
												parentName(e.parentId),
												e.amount != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-auto font-medium text-foreground",
													children: formatMoney(e.amount, lang)
												})
											]
										}),
										canDecide(e, me) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => decide(e.id, "valide"),
												className: "inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), t.dashboard.approve]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => decide(e.id, "refuse"),
												className: "inline-flex flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), t.dashboard.decline]
											})]
										}),
										e.status === "propose" && e.createdBy === me && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs italic text-muted-foreground",
											children: t.dashboard.waiting
										})
									]
								}, e.id))]
							})
						]
					})]
				})]
			}),
			modal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddModal, {
				me,
				defaultDate: toIso(today),
				onClose: () => setModal(false),
				onSave: (e) => {
					setEvents((prev) => [...prev, e]);
					setModal(false);
					flash(e.status === "valide" ? t.modal.savedValidated : t.modal.savedProposed);
				}
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border bg-popover px-4 py-3 text-sm shadow-glow",
				children: toast
			})
		]
	});
}
function AddModal({ me, defaultDate, onClose, onSave }) {
	const { t } = useI18n();
	const [type, setType] = (0, import_react.useState)("activite");
	const [kind, setKind] = (0, import_react.useState)("sport");
	const [date, setDate] = (0, import_react.useState)(defaultDate);
	const [time, setTime] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const [childId, setChildId] = (0, import_react.useState)(demoChildren[0].id);
	const [parentId, setParentId] = (0, import_react.useState)(me);
	const [title, setTitle] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const isActivity = type === "activite";
	const submit = (ev) => {
		ev.preventDefault();
		const errs = {};
		if (!date) errs.date = t.modal.dateRequired;
		if (!title.trim()) errs.title = t.modal.descRequired;
		const amt = amount.trim() ? Number(amount.replace(",", ".")) : void 0;
		if (amt !== void 0 && (isNaN(amt) || amt < 0)) errs.amount = t.modal.amountInvalid;
		setErrors(errs);
		if (Object.keys(errs).length) return;
		onSave({
			id: crypto.randomUUID(),
			type,
			date,
			childId,
			parentId,
			createdBy: me,
			title: title.trim().slice(0, 200),
			status: initialStatus(type),
			...amt !== void 0 ? { amount: amt } : {},
			...time ? { time } : {},
			...place.trim() ? { place: place.trim().slice(0, 120) } : {},
			...isActivity ? { kind } : {}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			role: "dialog",
			"aria-label": t.modal.title,
			onSubmit: submit,
			onClick: (e) => e.stopPropagation(),
			noValidate: true,
			className: "max-h-[92vh] w-full max-w-md space-y-4 overflow-y-auto rounded-t-2xl border bg-card p-6 sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: t.modal.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						"aria-label": t.modal.cancel,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5 text-muted-foreground" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.modal.type,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: type,
							onChange: (e) => setType(e.target.value),
							className: inputCls,
							children: eventTypes.map((ty) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: ty,
								children: t.types[ty]
							}, ty))
						})
					}), isActivity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.modal.kind,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: kind,
							onChange: (e) => setKind(e.target.value),
							className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
							children: activityKinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: t.kinds[k]
							}, k))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.modal.description,
					error: errors.title,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						maxLength: 200,
						onChange: (e) => setTitle(e.target.value),
						className: inputCls
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.modal.date,
						error: errors.date,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							className: inputCls
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.modal.time,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: time,
							onChange: (e) => setTime(e.target.value),
							className: inputCls
						})
					})]
				}),
				(isActivity || type === "reunion_scolaire") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.modal.place,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: place,
						maxLength: 120,
						onChange: (e) => setPlace(e.target.value),
						className: "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.modal.child,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: childId,
							onChange: (e) => setChildId(e.target.value),
							className: inputCls,
							children: demoChildren.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.firstName
							}, c.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.modal.parent,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: parentId,
							onChange: (e) => setParentId(e.target.value),
							className: inputCls,
							children: parents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.modal.amount,
					error: errors.amount,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						className: inputCls
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: onClose,
						children: t.modal.cancel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: t.modal.save
					})]
				})
			]
		})
	});
}
//#endregion
export { Dashboard as component };
