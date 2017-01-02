import { Injectable } from '@angular/core';

@Injectable()
export class DebugService {
  private proxyEnabled = false;

  private proxy = "https://cisco-itk-proxy.herokuapp.com/";

  constructor() { }


  isProxyEnabled(){
    return this.proxyEnabled
  }

  getProxyUrl(){
    return this.proxy;
  }

  enableProxy(enabled){
    this.proxyEnabled = enabled;
    return this.proxyEnabled;
  }

}
