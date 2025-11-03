export interface Outfit {
  style: string;
  imageUrl: string;
}

export interface FileData {
  base64: string;
  mimeType: string;
}

export interface UserProfile {
  preferredStyles: string[];
  favoriteColors: string;
  disliked: string;
}
