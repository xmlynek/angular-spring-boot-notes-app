export interface Note {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  tags: Array<string>;
  isPinned: boolean;
}
