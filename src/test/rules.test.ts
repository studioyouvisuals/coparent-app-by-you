import { describe, expect, it } from "vitest";
import { canDecide, initialStatus } from "@/lib/events";
import { detectLang, formatDate, formatMoney } from "@/i18n";

const norm = (s: string) => s.replace(/\u202f|\u00a0/g, " ");

describe("business rules", () => {
  it("non-custody events start as proposed", () => {
    expect(initialStatus("vacances")).toBe("propose");
    expect(initialStatus("achat")).toBe("propose");
  });
  it("custody events start validated", () => {
    expect(initialStatus("garde")).toBe("valide");
    expect(initialStatus("activite")).toBe("propose");
  });
  it("only the other parent can approve or decline a proposal", () => {
    const e = {
      id: "x",
      type: "activite" as const,
      title: "Match",
      date: "2026-11-07",
      childId: "c1",
      parentId: "p1",
      createdBy: "p1",
      status: "propose" as const,
    };
    expect(canDecide(e, "p1")).toBe(false);
    expect(canDecide(e, "p2")).toBe(true);
    expect(canDecide({ ...e, status: "valide" }, "p2")).toBe(false);
  });
  it("defaults to French, follows English browser, respects stored choice", () => {
    expect(detectLang(null, "de-DE")).toBe("fr");
    expect(detectLang(null, "en-GB")).toBe("en");
    expect(detectLang("fr", "en-US")).toBe("fr");
  });
  it("formats dates and amounts per language", () => {
    const d = new Date(2026, 10, 7);
    expect(formatDate(d, "fr")).toBe("07/11/2026");
    expect(formatDate(d, "en")).toBe("11/07/2026");
    expect(norm(formatMoney(6.99, "fr"))).toBe("6,99 €");
    expect(formatMoney(6.99, "en")).toBe("€6.99");
  });
});
