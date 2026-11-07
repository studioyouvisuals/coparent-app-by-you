import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { o as useDocTitle, s as useI18n } from "./i18n-CU4myw4a.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Logo, n as Field, r as LangSwitch, s as inputCls, t as Button } from "./shell-LyhWjmUC.mjs";
import { d as MailCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/connexion-Dk8f0stp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { t } = useI18n();
	useDocTitle(t.meta.login);
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const submit = (e) => {
		e.preventDefault();
		if (!/^\S+@\S+\.\S+$/.test(email)) return setError(t.login.invalidEmail);
		setError("");
		setSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-hero px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-md items-center justify-between py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-16 w-full max-w-md rounded-2xl border bg-card p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: t.login.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t.login.subtitle
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex gap-3 rounded-xl border bg-secondary p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "h-5 w-5 shrink-0 text-success" }), t.login.sent]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					noValidate: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.login.email,
						error,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: t.login.placeholder,
							className: inputCls
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: t.login.submit
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 block text-center text-sm text-muted-foreground hover:text-foreground",
					children: t.login.back
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
