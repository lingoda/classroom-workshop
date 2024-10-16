export interface ImagePage {
  type: 'Image';
  content: string | null;
}

export interface VideoPage {
  type: 'Video';
  content: string | null;
}

export interface QuizPage {
  type: 'Quiz';
  content: null;
}

export interface PollPage {
  type: 'Poll';
  content: {
    question: string;
    options: string[];
  } | null;
}

export type Page = ImagePage | VideoPage | QuizPage | PollPage;
export type PageType = Page['type']
export type PageContent = Page['content']