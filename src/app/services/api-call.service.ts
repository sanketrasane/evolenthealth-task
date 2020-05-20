import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  getData<T>(url: string) {
    return this.http.get<T>(url);
  }

  putData<T>(url: string, data) {
    return this.http.put<T>(url, data);
  }
}
