import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error(error.message);
    }
  } else {
    console.error("Unexpected error: ", error);
  }
  throw error;
};
const requests = {
  post: (url: string, body: {}) =>
    axios.post(url, body).then(responseBody).catch(handleError),
  get: (url: string) => axios.get(url).then(responseBody).catch(handleError),
  deleteMultiple: (url: string, body: {}) =>
    axios.delete(url, { data: body }).then(responseBody).catch(handleError),
  delete: (url:string) => axios.delete(url).then(responseBody).catch(handleError)
};

const GroupService = {
  postGroup: (data: {}) => requests.post("Group", data),
  getGroup: () => requests.get("Group"),
  deleteGroup: (ids: string[]) => requests.deleteMultiple(`Group`, ids),
};

const MemberService = {
  getMembers: (groupId?: string) => requests.get(`Member/Group/${groupId}`),
  postMember: (data: {}, groupId?: string) =>
    requests.post(`Member/Group/${groupId}`, data),
  deleteMember: (id:string) => requests.delete(`Member/${id}`)
};

export const API = {
  GroupService,
  MemberService,
};
