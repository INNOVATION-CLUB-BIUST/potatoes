import SMSService from "@/utilities/SMSService";

export async function POST() {
  try {
    const response = await SMSService.sendSMS({
      phoneNumbers: ["78757803"], 
      message: "🚀 Innovation Club test SMS working!",
    });

    return Response.json({
      success: true,
      response,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}