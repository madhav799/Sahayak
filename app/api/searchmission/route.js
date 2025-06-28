import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const dynamic = "force-dynamic"; // for Next.js App Router to force dynamic route

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return new Response(JSON.stringify({ message: "Missing query param" }), {
        status: 400,
      });
    }

    const users = await User.find({
      mission: { $regex: q, $options: "i" },
    }).select("username mission");

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (err) {
    console.error("API searchmission error", err);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
