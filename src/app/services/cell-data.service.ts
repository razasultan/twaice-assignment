import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { batteryDataModel } from '../twaice-task/models/cellData_model';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class CellDataService {
  private _url : string = "/assets/batteryData.json";

  constructor(private _httpClient : HttpClient) { }

   getAllCellsData(): Observable<batteryDataModel[]> {
    return this._httpClient.get<batteryDataModel[]>(this._url)
        .pipe(catchError(this.handleError));
    }

    handleError(error: Response) {
      console.error(error);
      return Observable.throw(error);
    }
}