class EquipmentApi {

    static requestHeaders() {
        return {'AUTHORIZATION': 'Bearer ${sessionStorage.jwt}'};
    }

    static getAllEquipments() {
        const headers = this.requestHeaders();
        const request = new Request('http://localhost:5000/api/adm/equipments', {
            method: 'GET',
            headers: headers
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static updateEquipment(equipment) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request('http://localhost:5000/api/adm/equipment/' + equipment.id, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({equipment: equipment})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static createEquipment(equipment) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request('http://localhost:5000/api/adm/equipment', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({equipment: equipment})
        });
        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteEquipment(equipment) {
        const headers = Object.assign({'Content-Type': 'application/json'}, this.requestHeaders());
        const request = new Request('http://localhost:5000/api/adm/equipment/' + equipment.id, {
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

export default EquipmentApi;