function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    const value = match ? decodeURIComponent(match[2]) : null;

    if (!value || value === "undefined") return null;

    return value;
}

export function isSession(): boolean {
    if (typeof window === "undefined") return false;

    const token = getCookie("accessToken");
    return !!token;
}
  
