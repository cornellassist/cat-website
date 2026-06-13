export const loadingComplete = (img: HTMLImageElement) => {
  img.classList.remove("opacity-0");
};

export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const imgLoadStyles =
  "opacity-0 transition-opacity duration-300 ease-out";
