export const baseUrl = "http://192.168.1.2:3001/"

export const get = (path) => {
    return fetch(baseUrl + path).then(response => {
        if (!response.ok) {
            throw new Error("Request falied: " + response.text);
        }
        return response.json();
    });
}
