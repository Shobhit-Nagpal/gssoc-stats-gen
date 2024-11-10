export function getNumberOfBadges(points: number) {
  if (points < 60) {
    return 0;
  }

  if (points >= 60 && points < 140) {
    return 1;
  }

  if (points >= 140 && points < 200) {
    return 2;
  }

  if (points >= 200 && points < 300) {
    return 3;
  }

  if (points >= 300 && points < 500) {
    return 4;
  }

  if (points >= 500 && points < 1200) {
    return 5;
  }

  if (points >= 1200 && points < 2500) {
    return 6;
  }

  return 7;
}
