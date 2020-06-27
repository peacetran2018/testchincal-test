import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  constructor(private http: HttpClient) { }
  
  getHierarchy(sessionKey) {
    return this.http.get<any>(`https://kem.greenkoncepts.com/ems/mvc/node-hierarchy-with-metadata?key=${sessionKey}`,
      {})
      .pipe(map(data => {
        return data;
      }));
  }
}
