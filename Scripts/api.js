export class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  createMessage(data) {
    return fetch(`${this._baseUrl}send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        number: data.number,
        subject: data.subject,
        text: data.text,
      }),
    }).then((res) => this._getResponse(res));
  }
}
