import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useI18n } from "./i18n-CU4myw4a.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Logo, o as cn, r as LangSwitch } from "./shell-LyhWjmUC.mjs";
import { _ as CalendarDays, a as Settings, f as HeartHandshake, l as Plane, n as Trophy, o as School, r as ShoppingBag } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-DsDvDyX8.js
var import_jsx_runtime = require_jsx_runtime();
function AppLayout({ children, active, onSection }) {
	const { t } = useI18n();
	const items = [
		{
			key: "calendar",
			label: t.sidebar.calendar,
			Icon: CalendarDays
		},
		{
			key: "vacances",
			label: t.sidebar.holidays,
			Icon: Plane
		},
		{
			key: "achat",
			label: t.sidebar.purchases,
			Icon: ShoppingBag
		},
		{
			key: "besoin",
			label: t.sidebar.needs,
			Icon: HeartHandshake
		},
		{
			key: "reunion_scolaire",
			label: t.sidebar.school,
			Icon: School
		},
		{
			key: "activite",
			label: t.sidebar.activities,
			Icon: Trophy
		}
	];
	const itemCls = (on) => cn("flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors", on ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen md:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between p-4 md:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, { className: "md:hidden" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0",
					children: [items.map(({ key, label, Icon }) => onSection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSection(key),
						className: itemCls(active === key),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
					}, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tableau-de-bord",
						className: itemCls(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
					}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/parametres",
						className: itemCls(active === "settings"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }), t.sidebar.settings]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden p-5 md:absolute md:bottom-0 md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 p-4 md:p-8",
			children
		})]
	});
}
var eventTypes = [
	"garde",
	"vacances",
	"achat",
	"besoin",
	"reunion_scolaire",
	"activite"
];
var activityKinds = [
	"sport",
	"spectacle",
	"sortie",
	"anniversaire"
];
/** An event created by one parent stays "proposed" until the other approves — except custody. */
function initialStatus(type) {
	return type === "garde" ? "valide" : "propose";
}
/** Only the parent who did NOT create a proposed event can approve or decline it. */
function canDecide(e, userId) {
	return e.status === "propose" && e.createdBy !== userId;
}
var parents = [{
	id: "p1",
	name: "Camille",
	color: "parent-a"
}, {
	id: "p2",
	name: "Thomas",
	color: "parent-b"
}];
var demoChildren = [{
	id: "c1",
	firstName: "Léa",
	birthDate: "2016-04-12"
}, {
	id: "c2",
	firstName: "Hugo",
	birthDate: "2019-09-03"
}];
/** Alternating weeks: ISO week parity decides the custody parent. */
function custodyParent(d) {
	const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	const day = t.getUTCDay() || 7;
	t.setUTCDate(t.getUTCDate() + 4 - day);
	const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
	return Math.ceil(((t.getTime() - yearStart.getTime()) / 864e5 + 1) / 7) % 2 === 0 ? "p1" : "p2";
}
var toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function demoEvents(today) {
	const at = (n) => {
		const d = new Date(today);
		d.setDate(d.getDate() + n);
		return toIso(d);
	};
	return [
		{
			id: "e1",
			demoKey: "e1",
			title: "",
			type: "reunion_scolaire",
			date: at(2),
			time: "18:00",
			childId: "c1",
			parentId: "p1",
			createdBy: "p1",
			status: "valide"
		},
		{
			id: "e2",
			demoKey: "e2",
			title: "",
			type: "achat",
			date: at(4),
			childId: "c2",
			parentId: "p2",
			createdBy: "p2",
			amount: 24.5,
			status: "propose"
		},
		{
			id: "e3",
			demoKey: "e3",
			title: "",
			type: "besoin",
			date: at(7),
			childId: "c2",
			parentId: "p1",
			createdBy: "p1",
			amount: 49.9,
			status: "propose"
		},
		{
			id: "e4",
			demoKey: "e4",
			title: "",
			type: "vacances",
			date: at(15),
			childId: "c1",
			parentId: "p2",
			createdBy: "p2",
			status: "propose"
		},
		{
			id: "e5",
			demoKey: "e5",
			title: "",
			type: "activite",
			kind: "spectacle",
			date: at(21),
			time: "19:30",
			childId: "c2",
			parentId: "p1",
			createdBy: "p1",
			status: "valide"
		},
		{
			id: "e6",
			demoKey: "e6",
			title: "",
			type: "activite",
			kind: "sport",
			date: at(28),
			childId: "c1",
			parentId: "p2",
			createdBy: "p2",
			amount: 120,
			status: "fait"
		},
		{
			id: "e7",
			demoKey: "e7",
			title: "",
			type: "activite",
			kind: "sport",
			date: at(3),
			time: "10:00",
			childId: "c2",
			parentId: "p2",
			createdBy: "p2",
			status: "propose"
		},
		{
			id: "e8",
			demoKey: "e8",
			title: "",
			type: "activite",
			kind: "anniversaire",
			date: at(10),
			time: "14:30",
			childId: "c1",
			parentId: "p1",
			createdBy: "p2",
			amount: 20,
			status: "propose"
		}
	];
}
//#endregion
export { demoChildren as a, initialStatus as c, custodyParent as i, parents as l, activityKinds as n, demoEvents as o, canDecide as r, eventTypes as s, AppLayout as t, toIso as u };
