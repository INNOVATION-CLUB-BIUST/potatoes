export const runtime = "nodejs";
import EmailSender from "@/utilities/EmailSender";

export async function POST(request) {
  try {
    const body = await request.json();

    await EmailSender.send(body);

    return Response.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("FULL ERROR:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}