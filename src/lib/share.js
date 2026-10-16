export function projectShareUrl(folder) {
  return `${window.location.origin}/projects?project=${encodeURIComponent(folder)}`;
}

export function eventShareUrl(folder) {
  return `${window.location.origin}/events?event=${encodeURIComponent(folder)}`;
}