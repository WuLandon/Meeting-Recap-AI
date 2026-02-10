import { NextResponse } from "next/server";

export function errorResponse(
  err: unknown,
  fallbackMessage = "Internal server error",
) {
  console.error("API error:", err);

  if (err instanceof Error) {
    const safeMessage =
      process.env.NODE_ENV === "production" ? fallbackMessage : err.message;

    return NextResponse.json(
      {
        success: false,
        error: safeMessage,
        code: "INTERNAL",
      },
      { status: 500 },
    );
  }

  // Non-Error throw
  return NextResponse.json(
    {
      success: false,
      error: fallbackMessage,
      code: "INTERNAL",
    },
    { status: 500 },
  );
}
