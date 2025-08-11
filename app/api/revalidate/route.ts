import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const AUTH_ACCESS_TOKEN_API = "AE1111ERffff";

  if (req.headers.get("AUTH_ACCESS_TOKEN_API") !== AUTH_ACCESS_TOKEN_API) {
    return NextResponse.json(
      { error: "Unauthorized AUTH_ACCESS_TOKEN_API request" },
      { status: 401 }
    );
  }

  try {
    revalidatePath("/");
    return NextResponse.json({ message: "Path revalidated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error || "Server error" },
      { status: 500 }
    );
  }
};
