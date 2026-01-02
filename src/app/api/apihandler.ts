import { connectDB } from "@/lib/dbConnect";

export const apiHandler = (handler : any) => async (req : any, res : any) => {
  try {
    await connectDB(); // Connect DB once per request
    return handler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
