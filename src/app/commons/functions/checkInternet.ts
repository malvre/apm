import { fromEvent, map, merge, Observable, Observer } from 'rxjs';

export const checkInternet = (): Observable<boolean> => {
  return merge(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
    new Observable((sub: Observer<boolean>) => {
      sub.next(navigator.onLine);
      sub.complete();
    })
  );
};
