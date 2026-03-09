const STOP_WORDS = new Set([
    "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in",
    "into", "is", "it", "no", "not", "of", "on", "or", "such", "that", "the",
    "their", "then", "there", "these", "they", "this", "to", "was", "will", "with",
    "what", "why", "how", "when", "who", "where", "can", "do", "we", "you", "i", "my",
    "your", "yours", "about", "above", "after", "again", "against", "all", "am", "any"
]);

export function removeDuplicates<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

export function normalizeText(text: string): string {
    if (!text) return "";

    let normalized = text.toLowerCase();
    // Remove URLs
    normalized = normalized.replace(/https?:\/\/[^\s]+/g, "");
    // Remove punctuation
    normalized = normalized.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, " ");

    // Remove stopwords
    const words = normalized.split(" ").filter(word => !STOP_WORDS.has(word) && word.length > 2);

    return words.join(" ").trim();
}

export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
    const normalized = normalizeText(text);
    const words = normalized.split(" ");

    const frequency: Record<string, number> = {};
    for (const word of words) {
        if (word) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    }

    // Sort by frequency descending
    const sorted = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    return removeDuplicates(sorted).slice(0, maxKeywords);
}
