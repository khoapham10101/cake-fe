export interface Article {
  id: number | string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  likeCount: number
}

export type CreateArticlePayload = Pick<Article, 'title' | 'body'>
export type UpdateArticlePayload = Pick<Article, 'id' | 'title' | 'body'>
