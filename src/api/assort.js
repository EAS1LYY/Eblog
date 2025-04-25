import http from "../utils/http.js"

export const reqAssortList = () => http.post("/assort/list")

export const reqarticleContent=(id)=>http.post("/Content",id)