
import { NextResponse } from "next/server";
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImageToDB } from "@/lib/FirebaseConfig"; // Make sure this points to your Firebase storage instance
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
        bodyParser: false, // Disables the default Next.js body parser
    },
};

export async function POST(req) {
    if (req.method !== 'POST') {
        console.log(req.method, 'method not allowed');
        return new NextResponse("Method Not Allowed", { status: 405 });
    }

    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) return reject(err);
            const file = files.file[0]; // Assuming 'file' is the name of your file input field
            const buffer = await fs.readFile(file.filepath);
            resolve({ fields, file: buffer });
        });
    });

    try {
        const fileBuffer = data.file;
        const storageRef = ref(ImageToDB, `uploads/${uuidv4()}.pdf`); // Ensure your path in storage is correctly set
        await uploadBytes(storageRef, fileBuffer, { contentType: 'application/pdf' });
        const firebaseUrl = await getDownloadURL(storageRef);
        return NextResponse.status(201).json({ data: firebaseUrl });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        return NextResponse.status(500).json({ error: 'Internal Server Error' });
    }
}
