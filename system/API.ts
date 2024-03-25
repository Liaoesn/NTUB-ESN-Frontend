import axios from "axios";

const API = axios.create({
  // API 主機資訊，寫在這我可以避免每個 call API的人都要寫哩哩叩叩的東西
  baseURL: "http://211.75.1.199:49999",//"https://file-processor.vercel.app/api/",
  // 限定 response 格式
  // 但 buffer(java 的 byte[]) 需要特別寫
  responseType: "json"
});

API.interceptors.request.use(function (config) {
  // 送出 request 前可以加工處理
  // 例如追加 header & 改參數
  return config;
});

API.interceptors.response.use(async function (resp) {
  // axios response 固定會在外面包一層物件
  // 因為我懶得管，所以直接 return resp.data
  // resp.data 固定是server回覆的文字內容
  // 我既不管 status code 或其他參數
  return resp.data;
});

export default API;
