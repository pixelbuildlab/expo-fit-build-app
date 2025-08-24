export function workoutDateFormate(_date: string): string {
  const now = new Date();
  const date = new Date(_date);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - target.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) {
    return date.toLocaleDateString('en-US', {weekday: 'long'});
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
export function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  let parts = [];

  if (h > 0) {
    parts.push(`${h}h`);

    // Only show minutes if > 0 OR seconds exist
    if (m > 0 && s > 0) {
      parts.push(`${m}m`);
    }
  } else if (m > 0) {
    parts.push(`${m}m`);
  }

  if (s > 0) {
    parts.push(`${s}s`);
  }

  return parts.join(' ');
}
