import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from 'canvas';

export async function POST(req: NextRequest) {
  try {

    const { rank, score, pullRequests, badges, githubUsername, profilePicUrl } = await req.json();

    const [certificateImg, profileImg] = await Promise.all([
      loadImage('public/certificate.png'),
      loadImage(profilePicUrl)
    ]);

    const canvas = createCanvas(certificateImg.width, certificateImg.height);
    const ctx = canvas.getContext('2d');

    // Draw certificate background
    ctx.drawImage(certificateImg, 0, 0);

    // Draw profile picture (circular)
    const profileSize = Math.min(certificateImg.width, certificateImg.height) * 0.15;
    const profileX = certificateImg.width * 0.09;
    const profileY = certificateImg.height * 0.16;
    ctx.save();
    ctx.beginPath();
    ctx.arc(profileX + profileSize / 2, profileY + profileSize / 2, profileSize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(profileImg, profileX, profileY, profileSize, profileSize);
    ctx.restore();

    // Add text
    ctx.fillStyle = 'black';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(githubUsername, certificateImg.width * 0.18, certificateImg.height * 0.20);
    
    ctx.font = 'bold 24px Arial';
    ctx.fillText(rank.toString(), certificateImg.width * 0.22, certificateImg.height * 0.72);
    ctx.fillText(score.toString(), certificateImg.width * 0.47, certificateImg.height * 0.72);
    ctx.fillText(pullRequests.toString(), certificateImg.width * 0.72, certificateImg.height * 0.72);
    ctx.fillText(badges.toString(), certificateImg.width * 0.92, certificateImg.height * 0.72);

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
