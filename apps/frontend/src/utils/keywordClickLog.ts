/**
 * Utility function to log keyword clicks to the backend API
 */
export async function logKeywordClick(keyword: string): Promise<void> {
  try {
    const response = await fetch('/api/keywordClickLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
    });

    if (!response.ok) {
      console.warn(`Failed to log keyword click: ${response.statusText}`);
      return;
    }

    const result = await response.json();
    console.log(`Keyword click logged successfully: ${keyword}`, result);
  } catch (error) {
    console.warn('Error logging keyword click:', error);
  }
}
