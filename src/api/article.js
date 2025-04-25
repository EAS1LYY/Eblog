import http from "../utils/http.js"

export const reqarticleList = (page) => http.get("/List?page="+page)

export const reqarticleContent=(id)=>http.post("/Content",id)

export const reqassortarticleList = (page,assortid) => http.get("/assort/content?page="+page+"&assortId="+assortid)

export const reqBasicData=()=>http.get("/BasicData")