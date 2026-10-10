import { z } from "zod";
export const AnalysisSchema = z.object({
  overallScore:z.number().min(0).max(100), atsScore:z.number().min(0).max(100), skillsMatch:z.number().min(0).max(100), experienceRelevance:z.number().min(0).max(100),
  summary:z.string(), educationFeedback:z.string(), formattingFeedback:z.string(), strengths:z.array(z.string()), weaknesses:z.array(z.string()), matchedKeywords:z.array(z.string()), missingKeywords:z.array(z.string()), recommendations:z.array(z.object({priority:z.enum(["High","Medium","Low"]),title:z.string(),detail:z.string()})),
});
export type Analysis = z.infer<typeof AnalysisSchema>;
export const RequestSchema=z.object({resumeText:z.string().min(50).max(30000),jobDescription:z.string().max(12000).optional().default(""),targetRole:z.string().max(120).optional().default("")});

