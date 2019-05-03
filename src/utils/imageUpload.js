import {API_HOST, API_VERSION} from './api_settings'

export function uploadImage(name, file) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    const formData = new FormData();
    formData.append("file", file, file.name);
    console.log("uploading file")
    req.open("POST", `${API_HOST}/${API_VERSION}/burgers/${name}/upload`)
    req.setRequestHeader('Authorization', localStorage.token)
    req.send(formData);
  })
}