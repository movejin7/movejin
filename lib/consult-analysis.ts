import { prisma } from "@/lib/prisma";
import { emitConsultUpdated } from "@/lib/socket-server";

type AiAnalysisResult = {
  category: string;
  summary: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
};

async function requestAnalysis(description: string): Promise<AiAnalysisResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a medical admin assistant. Return strict JSON with keys: category, summary, urgency. Urgency must be LOW, MEDIUM, or HIGH."
        },
        {
          role: "user",
          content: description
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error("OpenAI analysis request failed");
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI response was empty");
  }

  const parsed = JSON.parse(content) as Partial<AiAnalysisResult>;

  if (!parsed.category || !parsed.summary || !parsed.urgency) {
    throw new Error("OpenAI response schema mismatch");
  }

  const urgency = ["LOW", "MEDIUM", "HIGH"].includes(parsed.urgency)
    ? (parsed.urgency as AiAnalysisResult["urgency"])
    : "MEDIUM";

  return {
    category: parsed.category,
    summary: parsed.summary,
    urgency
  };
}

export async function runConsultAnalysis(consultId: string, description: string) {
  try {
    const analysis = await requestAnalysis(description);

    const updatedConsult = await prisma.consult.update({
      where: { id: consultId },
      data: {
        analysisCategory: analysis.category,
        analysisSummary: analysis.summary,
        analysisUrgency: analysis.urgency,
        analysisStatus: "COMPLETED"
      }
    });

    emitConsultUpdated(updatedConsult);
  } catch {
    const failedConsult = await prisma.consult.update({
      where: { id: consultId },
      data: {
        analysisStatus: "FAILED"
      }
    });

    emitConsultUpdated(failedConsult);
  }
}
