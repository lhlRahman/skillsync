import { NextResponse } from "next/server";
import { ImageToDB } from "@/lib/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import updateTrip from '@/lib/db/trips/updateTrip';

//export const runtime = "edge";

export async function POST(req) {
  if (req.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  console.log("Request in post:", req);

  const trip = await req.json();
  console.log("Trip:", trip.location);
  const image_description = await generateImagePrompt(trip.location);

  if (!image_description) {
    return new NextResponse("Failed to generate image description", { status: 500 });
  }

  const image_url = await generateImage(image_description);
  if (!image_url) {
    return new NextResponse("Failed to generate image", { status: 500 });
  }

  try {
    const storageRef = ref(ImageToDB, `upload/${uuidv4()}`);
    const response = await fetch(image_url);
    const buffer = await response.arrayBuffer();
    await uploadBytes(storageRef, buffer, { contentType: "image/jpeg" });
    const firebase_url = await getDownloadURL(storageRef);
    trip.imageUrl = firebase_url;

    return new NextResponse(JSON.stringify({ data: trip }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error uploading image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}