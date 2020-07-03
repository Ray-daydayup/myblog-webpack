import http from '@/utils/http'

export const getCount = async function () {
  const res = await http.get('/article/list/count')
  return res
}

export const getArticleList = async function (...options) {
  const [page, pageSize, moreDetail = false, option = {}] = options
  const res = await http.post(`/article/list/${page}/${pageSize}`, {
    moreDetail,
    ...option
  })
  return res
}

export const getTagList = async function () {
  const res = await http.get('/tag/list')
  return res
}

export const getCategories = async function () {
  const res = await http.get('/category/list')
  return res
}

export const getArticleById = async function (id) {
  const res = await http.get(`/article/list/${id}`)
  return res
}
