import { ARTICLES_DUMMY } from '@/dummies/articles'
import { Article, CreateArticlePayload, UpdateArticlePayload } from '@/types/article'
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('articles', {
  state: () => {
    return { articles: ARTICLES_DUMMY }
  },
  getters: {
    articlesList: state => state.articles,
  },
  actions: {
    addArticles(payload: CreateArticlePayload) {
      this.articles.push({
        ...payload,
        likeCount: 0,
        id: this.articles.length + 1,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      })
    },
    removeArticle(id: number | string) {
      const index = this.articles.findIndex(article => article.id === id)
      this.articles.splice(index, 1)
    },
    updateArticle(payload: UpdateArticlePayload) {
      let articleUpdate = this.articles.find(article => article.id === payload.id)
      if (articleUpdate) {
        articleUpdate = {
          ...articleUpdate,
          title: payload.title,
          body: payload.body,
          updatedAt: new Date().toString(),
        }
      }
      this.articles = this.articles.map(article => (article.id === payload.id ? articleUpdate : article)) as Article[]
    },
  },
})
