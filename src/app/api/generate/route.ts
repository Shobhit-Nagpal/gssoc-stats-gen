import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage, registerFont, Image } from "canvas";
import path from "path";
import fs from "fs/promises";

interface BadgeImages {
  [key: string]: Image;
}

async function loadBadgeImages(): Promise<BadgeImages> {
  const badgeImages: BadgeImages = {};
  const badgeFiles = [
    "1-postman.png",
    "1.png",
    "2-postman.png",
    "2.png",
    "3-postman.png",
    "3.png",
    "4-postman.png",
    "4.png",
    "5-postman.png",
    "5.png",
    "6-postman.png",
    "6.png",
    "7-postman.png",
    "7.png",
    "nobadge.png",
    "postman.png",
  ];

  for (const file of badgeFiles) {
    const filePath = path.join(process.cwd(), "public", "images", file);
    const buffer = await fs.readFile(filePath);
    badgeImages[file] = await loadImage(buffer);
  }

  return badgeImages;
}

export async function POST(req: NextRequest) {
  try {
    const {
      rank,
      score,
      pullRequests,
      badges,
      githubUsername,
      profilePicUrl,
      postmanBadge,
    } = await req.json();

    // Adjust total badges count
    const totalBadges = postmanBadge ? badges + 1 : badges;

    // Register font
    const fontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "montserrat.ttf",
    );
    registerFont(fontPath, { family: "Montserrat" });

    const [profileImg, badgeImages] = await Promise.all([
      loadImage(profilePicUrl),
      loadBadgeImages(),
    ]);

    // Select background image based on total badges
    let backgroundImg;
    if (badges === 0 && !postmanBadge) {
      backgroundImg = badgeImages["nobadge.png"];
    } else if (badges === 0 && postmanBadge) {
      backgroundImg = badgeImages["postman.png"];
    } else if (totalBadges > 7) {
      backgroundImg = badgeImages["7.png"];
    } else {
      const badgeFileName = postmanBadge
        ? `${badges}-postman.png`
        : `${badges}.png`;
      backgroundImg = badgeImages[badgeFileName];
    }

    const canvas = createCanvas(backgroundImg.width, backgroundImg.height);
    const ctx = canvas.getContext("2d");

    // Draw background (which is now the badge or certificate image)
    ctx.drawImage(backgroundImg, 0, 0);

    // Calculate profile picture size and position
    const profileSize = Math.min(canvas.width, canvas.height) * 0.1;
    const profileX = canvas.width * 0.22;
    const profileY = canvas.height * 0.24;

    // Function to draw circular profile picture
    const drawCircularProfile = (x: number, y: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        x + profileSize / 2,
        y + profileSize / 2,
        profileSize / 2,
        0,
        Math.PI * 2,
        true,
      );
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profileImg, x, y, profileSize, profileSize);
      ctx.restore();
    };

    // Draw top profile picture
    drawCircularProfile(profileX, profileY);

    // Draw bottom profile picture
    const bottomProfileX = canvas.width * 0.473;
    const bottomProfileY = canvas.height * 0.8; // Adjust this value to position the bottom profile picture
    drawCircularProfile(bottomProfileX, bottomProfileY);

    // Add text
    ctx.fillStyle = "black";
    ctx.font = "bold 18px Montserrat";
    ctx.fillText(rank.toString(), canvas.width * 0.165, canvas.height * 0.3);
    ctx.fillText(githubUsername, canvas.width * 0.38, canvas.height * 0.3);
    ctx.fillText(
      pullRequests.toString() + "PRs",
      canvas.width * 0.57,
      canvas.height * 0.3,
    );
    ctx.fillText(
      score.toString() + "pts",
      canvas.width * 0.64,
      canvas.height * 0.3,
    );

    ctx.font = "bold 20px Montserrat";
    ctx.fillStyle = "white";
    ctx.fillText(rank.toString(), canvas.width * 0.235, canvas.height * 0.757);
    ctx.fillText(score.toString(), canvas.width * 0.43, canvas.height * 0.756);
    ctx.fillText(
      pullRequests.toString(),
      canvas.width * 0.666,
      canvas.height * 0.757,
    );
    ctx.fillText(
      totalBadges.toString(),
      canvas.width * 0.875,
      canvas.height * 0.757,
    );

    ctx.fillStyle = "#545454";
    ctx.font = "12px Montserrat";

    ctx.fillText(
      githubUsername,
      canvas.width / 2 - (ctx.measureText(githubUsername).width + 10),
      canvas.height * 0.931,
    );

    const buffer = canvas.toBuffer("image/png");
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="certificate.png"',
      },
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 },
    );
  }
}
