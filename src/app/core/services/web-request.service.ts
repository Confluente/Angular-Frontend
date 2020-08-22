import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebRequestService {

    readonly ROOT_URL;

    constructor(private http: HttpClient) {
        this.ROOT_URL = environment.ROOT_URL;
    }

    get(uri: string, httpOptions: object = {observe: 'response', withCredentials: true}) {
        return this.http.get(`${this.ROOT_URL}/${uri}`, httpOptions);
    }

    put(uri: string, payload: object, httpOptions: object = {observe: 'response', withCredentials: true}) {
        return this.http.put(`${this.ROOT_URL}/${uri}`, payload, httpOptions);
    }

    post(uri: string, payload: object, httpOptions: object = {observe: 'response', withCredentials: true}) {
        return this.http.post(`${this.ROOT_URL}/${uri}`, payload, httpOptions);
    }

    patch(uri: string, payload: object, httpOptions: object = {observe: 'response', withCredentials: true}) {
        return this.http.patch(`${this.ROOT_URL}/${uri}`, payload, httpOptions);
    }

    delete(uri: string, httpOptions: object = {observe: 'response', withCredentials: true}) {
        return this.http.delete(`${this.ROOT_URL}/${uri}`, httpOptions);
    }
}
