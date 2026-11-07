import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useI18n } from "./i18n-CU4myw4a.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-LyhWjmUC.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Logo() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2 font-semibold tracking-tight",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex gap-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-1 rounded-full bg-primary-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-1 rounded-full bg-primary-foreground/60" })]
			})
		}), t.brand]
	});
}
function LangSwitch({ className }) {
	const { lang, setLang, t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"aria-label": t.lang.switch,
		className: cn("inline-flex rounded-full border bg-secondary p-0.5 text-xs font-medium", className),
		children: ["fr", "en"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setLang(l),
			"aria-pressed": lang === l,
			className: cn("rounded-full px-3 py-1 uppercase transition-colors", lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
			children: l
		}, l))
	});
}
var btn = (variant = "primary") => cn("inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all disabled:opacity-50", variant === "primary" && "bg-primary text-primary-foreground shadow-glow hover:brightness-110", variant === "outline" && "border bg-secondary/40 text-foreground hover:bg-secondary", variant === "ghost" && "text-muted-foreground hover:text-foreground");
function Button({ variant, className, ...p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(btn(variant), className),
		...p
	});
}
var inputCls = "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
function Field({ label, children, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-muted-foreground",
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { btn as a, Logo as i, Field as n, cn as o, LangSwitch as r, inputCls as s, Button as t };
