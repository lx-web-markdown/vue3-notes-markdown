export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface MarkdownCompProps {
  markdownFilePath: string;
}

export interface UseMarkdownOptions {
  onError?: (error: Error) => void;
} 