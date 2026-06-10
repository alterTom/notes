// Lightweight Markdown renderer and syntax highlighter
// No external dependencies — handles common Markdown syntax in a notes app

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ---- RENDERER (text → HTML) ----

/**
 * Render Markdown string to HTML.
 * Supports: headings, bold, italic, strikethrough, inline code, code blocks,
 * blockquotes, unordered/ordered lists, links, images, horizontal rules.
 */
export function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];

    // Fenced code block
    if (/^```/.test(raw)) {
      const lang = raw.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      const codeContent = escapeHtml(codeLines.join('\n'));
      const langTag = lang ? ` class="language-${escapeHtml(lang)}"` : '';
      output.push(`<pre><code${langTag}>${codeContent}\n</code></pre>`);
      i++; // skip closing ```
      continue;
    }

    // Empty line
    if (raw.trim() === '') {
      output.push('');
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(raw)) {
      output.push('<hr />');
      i++;
      continue;
    }

    // Heading
    const headingMatch = raw.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      output.push(`<h${level}>${parseInline(text)}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote — collect consecutive blockquote lines
    if (/^>\s?/.test(raw)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      const quoteContent = renderMarkdown(quoteLines.join('\n'));
      output.push(`<blockquote>${quoteContent}</blockquote>`);
      continue;
    }

    // Unordered list — collect consecutive items
    if (/^[\-\*\+]\s/.test(raw)) {
      const items: string[] = [];
      while (i < lines.length && /^[\-\*\+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[\-\*\+]\s/, ''));
        i++;
      }
      output.push('<ul>' + items.map(item => `<li>${parseInline(item)}</li>`).join('') + '</ul>');
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(raw)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      output.push('<ol>' + items.map(item => `<li>${parseInline(item)}</li>`).join('') + '</ol>');
      continue;
    }

    // Regular paragraph
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,6}\s|>\s?|[\-\*\+]\s|\d+\.\s|```|(-{3,}|\*{3,}|_{3,})\s*$)/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    output.push(`<p>${parseInline(paraLines.join('\n'))}</p>`);
  }

  return output.join('\n');
}

function parseInline(text: string): string {
  // Escape HTML first
  let result = escapeHtml(text);

  // Images ![alt](url)
  result = result.replace(/!\[([^\]]*)\]\(([^)\s]+(?:\s+"[^"]*")?)\)/g, (_m, alt, url) => {
    const cleanUrl = url.replace(/\s+"[^"]*"$/, '');
    const titleMatch = url.match(/\s+"([^"]*)"$/);
    const title = titleMatch ? ` title="${escapeHtml(titleMatch[1])}"` : '';
    return `<img src="${escapeHtml(cleanUrl)}" alt="${escapeHtml(alt)}"${title} />`;
  });

  // Links [text](url)
  result = result.replace(/\[([^\]]*)\]\(([^)\s]+(?:\s+"[^"]*")?)\)/g, (_m, text, url) => {
    const cleanUrl = url.replace(/\s+"[^"]*"$/, '');
    const titleMatch = url.match(/\s+"([^"]*)"$/);
    const title = titleMatch ? ` title="${escapeHtml(titleMatch[1])}"` : '';
    return `<a href="${escapeHtml(cleanUrl)}"${title}>${text}</a>`;
  });

  // Bold **text** or __text__
  result = result.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

  // Italic *text* or _text_ (not part of **)
  result = result.replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  result = result.replace(/(?<!_)_(?!_)([^_]+?)(?<!_)_(?!_)/g, '<em>$1</em>');

  // Strikethrough ~~text~~
  result = result.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Inline code `code`
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Replace newlines within paragraphs with <br />
  result = result.replace(/\n/g, '<br />');

  return result;
}

// ---- SYNTAX HIGHLIGHTER (text → HTML with span classes) ----

const SYNTAX_PATTERNS: [RegExp, string][] = [
  // Headings (must come before bold)
  [/^(#{1,6})\s.+$/gm, 'md-heading'],
  // Bold + Italic
  [/(\*\*\*|___)(.*?)\1/g, 'md-bold-italic'],
  // Bold
  [/(\*\*|__)(.*?)\1/g, 'md-bold'],
  // Italic
  [/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, 'md-italic'],
  [/(?<!_)_(?!_)([^_]+?)(?<!_)_(?!_)/g, 'md-italic'],
  // Strikethrough
  [/~~(.*?)~~/g, 'md-strikethrough'],
  // Inline code
  [/`([^`]+)`/g, 'md-code'],
  // Links
  [/\[([^\]]*)\]\(([^)]+)\)/g, 'md-link'],
  // Images
  [/!\[([^\]]*)\]\(([^)]+)\)/g, 'md-image'],
  // Blockquotes
  [/^(>)\s?/gm, 'md-quote'],
  // Unordered list markers
  [/^([\-\*\+])\s/gm, 'md-list-marker'],
  // Ordered list markers
  [/^(\d+\.)\s/gm, 'md-list-marker'],
  // Horizontal rules
  [/^(-{3,}|\*{3,}|_{3,})\s*$/gm, 'md-hr'],
];

/**
 * Highlight Markdown syntax in plain text.
 * Returns HTML string with markdown syntax wrapped in <span class="md-*"> tags.
 * Non-syntax content is left as-is (will be escaped by React).
 */
export function highlightMarkdown(text: string): string {
  // We use a two-pass approach:
  // 1. Mark positions of all matches to avoid overlap
  // 2. Build the output string with spans

  interface Span {
    start: number;
    end: number;
    className: string;
  }

  const spans: Span[] = [];

  // Collect all matches
  for (const [pattern, className] of SYNTAX_PATTERNS) {
    // Create a fresh regex for each pass to avoid lastIndex issues
    const re = new RegExp(pattern.source, pattern.flags);
    let match: RegExpExecArray | null;
    while ((match = re.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      // Check overlap with existing spans — only add if no overlap
      const overlaps = spans.some(s =>
        (start >= s.start && start < s.end) ||
        (end > s.start && end <= s.end) ||
        (start <= s.start && end >= s.end)
      );
      if (!overlaps) {
        spans.push({ start, end, className });
      }
      if (match[0].length === 0) break; // prevent infinite loop on zero-width match
    }
  }

  // Sort by position
  spans.sort((a, b) => a.start - b.start);

  // Build output
  let result = '';
  let pos = 0;
  for (const span of spans) {
    if (span.start > pos) {
      result += escapeHtml(text.slice(pos, span.start));
    }
    result += `<span class="${span.className}">${escapeHtml(text.slice(span.start, span.end))}</span>`;
    pos = span.end;
  }
  result += escapeHtml(text.slice(pos));

  return result;
}
