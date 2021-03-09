import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineofflineService {

  private statusConnexion$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online',  ()  => this.actualizeStatusConnexion());
    window.addEventListener('offline', () => this.actualizeStatusConnexion());
  }

  get isOnLine(): boolean {
    return !!window.navigator.onLine;
  }

  get statusConnexion(): Observable<boolean> {
    return this.statusConnexion$.asObservable();
  }

  actualizeStatusConnexion() {
    this.statusConnexion$.next(this.isOnLine);
  }

}
