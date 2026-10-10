import { describe, expect, it } from "vitest";
import { AnalysisSchema, RequestSchema } from "../lib/schema";
import { mockAnalysis } from "../lib/mock";
describe("analysis input validation",()=>{
 it("rejects short resume text",()=>{expect(RequestSchema.safeParse({resumeText:"too short"}).success).toBe(false)});
 it("limits extracted text size",()=>{expect(RequestSchema.safeParse({resumeText:"x".repeat(30001)}).success).toBe(false)});
 it("rejects scores outside the 0–100 range",()=>{expect(AnalysisSchema.safeParse({...mockAnalysis("experience product designer",""),overallScore:101}).success).toBe(false)});
 it("marks estimates with structured recommendations",()=>{const result=mockAnalysis("Product designer, Figma, user research", "Figma product design research");expect(result.overallScore).toBeGreaterThanOrEqual(0);expect(result.recommendations[0].priority).toBe("High");expect(result.matchedKeywords).toContain("figma")});
});

