import http from '@/utils/http'

export const getCount = async function () {
  const res = await http.get('/article/list/count')
  return res
}

export const getArticleList = async function (
  page,
  pageSize,
  moreDetail = false
) {
  const res = await http.post(`/article/list/${page}/${pageSize}`, {
    moreDetail
  })
  return res
}

export const getTagList = async function () {
  const res = await http.get('/tag/list')
  return res
}
