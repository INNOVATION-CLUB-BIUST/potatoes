import SMSSender from "@/utilities/SMSSender";

export async function POST(request) {
  try {
    const body = await request.json();

    await SMSSender.send(body);

    return Response.json({
      success: true,
      message: "SMS sent successfully!",
    });

  } catch (error) {
    console.error("SMS ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}