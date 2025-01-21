import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(request: Request) {
  try {
 const response2 = await request.json(); 
    const { name, category, materials } = response2;
    if (!name || !category || !materials) {
      return NextResponse.json(
        { error: "Missing required fields: name, category, material" },
        { status: 400 }
      );
    }

const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions';
    const apiToken = process.env.HUGGING_FACE_API_KEY // Replace with your Hugging Face API token

    // Parse incoming request body if you want to forward user-provided content

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          {
            role: 'user',
            content: `You are an AI assistant for an ecommerce platform that sells clothing. Merchants provide raw product descriptions, and your job is to create polished, creative marketing descriptions. Focus on highlighting the product's materials, colors, sizes, and uses. Also, consider the seasons in which the product can be worn. Here is the merchant's input:

    Product: ${name},
    Material: ${materials},
    Category: ${category}

    Create a professional and polished description for this product.`,
          },
        ],
        max_tokens: 160,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract the content from the choices array
    const content = data.choices?.[0]?.message?.content || 'No content available';

    return NextResponse.json({ description: content });
  } catch (error) {
    console.error("Error generating description:", error);
    return NextResponse.json(
      { error: "Failed to generate description. Please try again." },
      { status: 500 }
    );
  }
}