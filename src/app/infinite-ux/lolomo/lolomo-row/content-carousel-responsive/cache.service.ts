import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  constructor() { }

  // Cache Management
  private contentCache = {};
  public setContentCache(categoryId, content, total){
    this.contentCache[categoryId] = {content:content,total:total};
  }
  public getContentCache(categoryId){
    return this.contentCache[categoryId]?this.contentCache[categoryId]:{content:[],total:0};
  }

}
