import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './models/person';
import { ResultSet } from './models/result-set';
import { PeopleService } from './services/people.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Cards App";
/* // Funciona para llamar *ngFor en el html asi .... (observpeople | async).data
  observpeople:Observable<ResultSet<Person>>;
  constructor(private peopleservice:PeopleService){
    this.observpeople = peopleservice.getPeople();
  }
*/
  observpeople:Observable<Array<Person>>;

  constructor(private peopleservice:PeopleService){
    this.observpeople = peopleservice.getPeople().pipe(
          map((info) => {
            return info.data;
          }),
          catchError((error, caught) => {
            return [];
          })
      );
  }
}
