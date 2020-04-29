import {autoinject} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Model} from "../model/model";

/**
 * Service implementation for aurelia frontend.
 *
 * Copyright: Tavo Annus
 */
@autoinject
export class Service<T extends Model> {
    constructor(protected http: HttpClient) {
        this.http.configure(config => {
            config
                .withBaseUrl('/api/generic/v1')
                .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                .withInterceptor({
                    request(request) {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        request.headers.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyTG9naW5JZCI6ImFkbWluIiwiaXNzIjoiQXBhY2hlT0ZCaXoiLCJleHAiOjE1ODc4NDI5OTk5OTk3MTgsImlhdCI6MTU4Nzg0MDkxOH0.3hZCbPuEoqQOUTYws1UtPToVuCZrQfaAVYkZIkPvAVd3m1cN-scUpIYErZFGTmMMfYHTEoMlbNlTG5l2GfkDVg")
                        return request;
                    },
                    response(response) {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });
    }

    protected formatUrl(url: string, params: Object): string {
        const esc = encodeURIComponent;
        const query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        return query.length > 0 ? url + '?' + query : url;
    }

    get<U>(url: string, params: Object = {}): Promise<U> {
        const formattedUrl = this.formatUrl(url, params);
        return this.http.fetch(formattedUrl)
            .then(response => response.json())
    }

    post(url: string, data: T): Promise<T> {
        console.log("POST data:", json(data));
        return this.http.fetch(url, {
            method: 'post',
            body: json(data.getPreparedJson()) // <- needed to remove related entities
        })
            .then(response => response.json());
    }
}
