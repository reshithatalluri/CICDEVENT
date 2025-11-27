export function callApi(requestmethod, url, data, responseHandler) {
  let options;
  if (requestmethod === "GET" || requestmethod === "DELETE") {
    options = { method: requestmethod, headers: { 'Content-Type': 'application/json' } };
  } else {
    options = { method: requestmethod, headers: { 'Content-Type': 'application/json' }, body: data };
  }

  fetch(url, options)
    .then(response => {
      if (!response.ok) throw new Error(response.status + " " + response.statusText);
      return response.text();
    })
    .then(data => responseHandler(data))
    .catch(error => alert(error));
}
