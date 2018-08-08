class BackgroundApi {

    static requestHeaders() {
        return {'AUTHORIZATION': 'Bearer ${sessionStorage.jwt}'};
    }

    static getAllBackgrounds() {
        const headers = this.requestHeaders();
        const request = new Request('http://localhost:5000/api/adm/backgrounds', {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static updateBackground(background) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request('http://localhost:5000/api/adm/background/' + background.id, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({background: background})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static createBackground(background) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request('http://localhost:5000/api/adm/background', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({background: background})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteBackground(background) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request('http://localhost:5000/api/adm/background/' + background.id, {
            method: 'DELETE',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default BackgroundApi;