export interface VerseApiResponse {
  verse: {
    details: {
      text: string;
      reference: string;
      version: string;
      verseurl: string;
    };
    notice: string;
  };
}
