import { ref } from 'vue';
import type { Ref } from 'vue';
import { renderMarkdown } from '@/utils/markedConfig';
import type { HeadingItem, UseMarkdownOptions } from './types';

export function useMarkdown(options: UseMarkdownOptions = {}) {
  const markdownContent = ref('');
  const headings = ref<HeadingItem[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const loadMarkdown = async (filePath: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load markdown file: ${response.status}`);
      }
      const text = await response.text();
      markdownContent.value = await renderMarkdown(text) + '<div style="height: 80px; background-color: transparent;"></div>';
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error');
      options.onError?.(error.value);
      console.error("Error loading markdown file:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const extractHeadings = (container: HTMLElement | null) => {
    if (!container) return;
    
    const headingsNodeList = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.value = Array.from(headingsNodeList).map(heading => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1))
    }));
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    markdownContent,
    headings,
    isLoading,
    error,
    loadMarkdown,
    extractHeadings,
    scrollToHeading
  };
} 