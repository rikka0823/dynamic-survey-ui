import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  constructor(private http: HttpClient) {}

  // 讀取
  getApi(url: string) {
    return this.http.get(url);
  }

  getApi1<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  // 新增
  postApi(url: string, postData: any) {
    return this.http.post(url, postData)
  }

  //　更新
  putApi(url: string, putData: any) {
    return this.http.put(url, putData);
  }

  // 刪除
  delApi(url: string) {
    return this.http.delete(url);
  }
}
