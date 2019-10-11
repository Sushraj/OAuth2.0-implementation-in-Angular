import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from './ProductDTO';
import { encode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ApiUrl: string = "http://192.168.0.147:8080/oauth-sample/v1/";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>(this.ApiUrl + 'Api/Product/GetProducts');
  }
  getProductById(Id: string): Observable<ProductDTO[]> {
    return this.httpClient.get<ProductDTO[]>(this.ApiUrl + 'Api/Product/GetProductById/' + Id)
  }
  insertProduct(product: any) {
    return this.httpClient.post<ProductDTO[]>(this.ApiUrl + 'Api/Product/InsertProduct', product)
  }
  updateProduct(product: any): Observable<ProductDTO[]> {
    return this.httpClient.put<ProductDTO[]>(this.ApiUrl + 'Api/Product/Updateproduct/', product);
  }
  deleteProduct(Id: string) {
    return this.httpClient.delete(this.ApiUrl + 'Api/Product/DeleteProduct/' + Id);
  }
  UserAuthentication(UserName: string, Password: string): Observable<any> {

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });

    let credentials = '?username=' + UserName + '&password=' + Password + '&grant_type=password';
    let oauth = "oauth/token" + credentials;
    let oauthApiEndPoint: string = this.ApiUrl + oauth;
    console.log('oauthApiEndPoint = ' + oauthApiEndPoint);

    return this.httpClient.post<any>(oauthApiEndPoint, null, { headers: reqHeader });
  }

}
