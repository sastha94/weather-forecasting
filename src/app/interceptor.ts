import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpParams, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap, throwError } from "rxjs";
import { environment } from "./environment";
import { ToastrService  } from "ngx-toastr";
@Injectable()
export class Interceptor implements HttpInterceptor {
  appID: string = environment.appId
  constructor(private toastr: ToastrService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const customReq = req.clone({
      params: new HttpParams().append('appid',this.appID)
    });

    return next.handle(customReq).pipe(tap((event: any) => {
      if (event instanceof HttpResponse) {
           console.log(event);
      }
  },(error: any) => {
      if (error instanceof HttpErrorResponse) {
      this.broadcastFriendlyErrorMessage(error); 
      }
      return throwError(()=> new Error(error));
  })) as any;
  }

  broadcastFriendlyErrorMessage(rejection: HttpErrorResponse) {
    let msg = '';
    if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
        this.toastr.error('Unable to connect to the server, please try again in a couple of seconds.');
    } else if (rejection.status === 400) {
        if (rejection.error) {
            msg = (rejection.error.message) ? rejection.error.message : rejection.error;
        }
        this.toastr.error(msg);
    } else if (rejection.status === 404) {
        if (rejection.error?.message) {
            this.toastr.error(rejection.error.message);
        }
        else{
          this.toastr.error(rejection.message);
        }
    } else if (rejection.status === 500) {
        if (rejection.error && rejection.error.failures) {
            this.toastr.error(rejection.error.failures);
        } else if (rejection.message) {
            const message = rejection.message;
            this.toastr.error(message);
        }
    } else if (rejection.status === 409) {
        if (rejection.error && rejection.error.Message) {
            this.toastr.error(rejection.error.Message);
        } else if (rejection.message) {
            const message = rejection.message;
            this.toastr.error(message);
        }
    }
}


}