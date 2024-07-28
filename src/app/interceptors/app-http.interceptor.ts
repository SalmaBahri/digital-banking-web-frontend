import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {request} from "node:http";
import {AuthService} from "../services/auth.service";
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private authService:AuthService) {
  }



intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("*******")
    console.log(req.url);
    if (!req.url.includes("/auth/login")){
      let newrequest=req.clone({
        headers:req.headers.set('Authorization','Bearer'+this.authService.accessToken)
      })
      return next.handle(newrequest);
    }else return next.handle(req);

}
}
