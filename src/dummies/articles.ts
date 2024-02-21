import { Article } from '@/types/article'

export const ARTICLES_DUMMY: Article[] = [
  {
    id: 1,
    title: 'Article 1',
    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate, velit ut esse labore nemo et, quia iusto repellat sunt minus a dolorum aperiam beatae nulla illo minima iure doloremque.',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    likeCount: Math.floor(Math.random() * 100),
  },
  {
    id: 2,
    title: 'Article 2',
    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate, velit ut esse labore nemo et, quia iusto repellat sunt minus a dolorum aperiam beatae nulla illo minima iure doloremque.',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    likeCount: Math.floor(Math.random() * 100),
  },
  {
    id: 3,
    title: 'Article 3',
    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi cupiditate, velit ut esse labore nemo et, quia iusto repellat sunt minus a dolorum aperiam beatae nulla illo minima iure doloremque.',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    likeCount: Math.floor(Math.random() * 100),
  },
]
