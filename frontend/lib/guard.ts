import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const guardRoute = async () => {
    let data = await auth();
    if (!data) redirect("/auth/login");
}