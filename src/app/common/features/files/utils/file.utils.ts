import { Observable } from 'rxjs';

export const fileToBase64$ = (file: File): Observable<string> =>
  new Observable((subscriber) => {
    if (!file) {
      subscriber.next('');
      subscriber.complete();
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = String(reader.result).replace('data:', '').replace(/^.+,/, '');

      subscriber.next(base64String);
      subscriber.complete();
    };

    reader.readAsDataURL(file);
  });
