import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);

      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string): any {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
