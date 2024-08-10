import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
    const { rank, score, pullRequests, badges, githubUsername, profilePicUrl } = await req.json();

    // Register a font that supports a wide range of characters
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'arial.ttf');
    registerFont(fontPath, { family: 'Arial' });

    // Load certificate image from the correct server path
    const certificatePath = path.join(process.cwd(), 'public', 'certificate.png');
    const certificateBuffer = await fs.readFile(certificatePath);

    const [certificateImg, profileImg] = await Promise.all([
      loadImage(certificateBuffer),
      loadImage(profilePicUrl)
    ]);

    const canvas = createCanvas(certificateImg.width, certificateImg.height);
    const ctx = canvas.getContext('2d');

    // Draw certificate background
    ctx.drawImage(certificateImg, 0, 0);

    // Draw profile picture (circular)
    const profileSize = Math.min(certificateImg.width, certificateImg.height) * 0.10;
    const profileX = certificateImg.width * 0.22;
    const profileY = certificateImg.height * 0.24;
    ctx.save();
    ctx.beginPath();
    ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
    ctx.restore();

    // Add text
    ctx.fillStyle = 'black';
    ctx.font = 'bold 18px Arial';
    ctx.fillText(rank.toString(), certificateImg.width * 0.165, certificateImg.height * 0.30);
    ctx.fillText(githubUsername, certificateImg.width * 0.38, certificateImg.height * 0.30);
    ctx.fillText(pullRequests.toString() + " PRs", certificateImg.width * 0.57, certificateImg.height * 0.30);
    ctx.fillText(score.toString() + " pts", certificateImg.width * 0.64, certificateImg.height * 0.30);
    
    ctx.font = 'bold 24px Arial';
    ctx.fillText(rank.toString(), certificateImg.width * 0.235, certificateImg.height * 0.76);
    ctx.fillText(score.toString(), certificateImg.width * 0.435, certificateImg.height * 0.76);
    ctx.fillText(pullRequests.toString(), certificateImg.width * 0.670, certificateImg.height * 0.76);
    ctx.fillText(badges.toString(), certificateImg.width * 0.875, certificateImg.height * 0.76);

    const buffer = canvas.toBuffer('image/png');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="certificate.png"'
      }
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
