import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { _id } = await request.json();
  const token = request.headers.get("Authorization"); // Extract the token from the request headers

  try {
    const res = await fetch(`http://localhost:5000/productPage/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Pass the token to the backend
      },
    });
    console.log(res)

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}