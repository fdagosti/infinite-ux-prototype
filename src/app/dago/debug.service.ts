import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {
  private proxyEnabled = true;
  private newLolomo = false;

  private proxy = "https://cisco-itk-proxy.herokuapp.com/";

  constructor() { }


  isProxyEnabled(){
    return this.proxyEnabled
  }

  isNewLolomoUsed(){
    return this.newLolomo;
  }

  useNewLolomo(b){
    this.newLolomo = b;
    return this.useNewLolomo;
  }

  getProxyUrl(){
    return this.proxy;
  }

  enableProxy(enabled){
    this.proxyEnabled = enabled;
    return this.proxyEnabled;
  }

}
