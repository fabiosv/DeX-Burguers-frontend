import {API_HOST, API_VERSION, headers} from './api_settings'

export function uploadImage(name, file) {
  const formData = new FormData();
  console.log(file)
  console.log(name)
  formData.append("file", file, name);

  return fetch(`${API_HOST}/${API_VERSION}/burgers/${name}/upload`,{
      method: 'POST',
      headers: {
        ...headers
      },
      body: formData
    })
    .then(res =>  res.json())
}