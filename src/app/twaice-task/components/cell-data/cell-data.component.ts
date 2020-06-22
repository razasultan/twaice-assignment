import { Component, OnInit } from '@angular/core';
import { CellDataService } from '../../../services/cell-data.service';
import {batteryDataModel} from '../../models/cellData_model';


@Component({
  selector: 'app-cell-data',
  templateUrl: './cell-data.component.html',
  styleUrls: ['./cell-data.component.css']
})
export class CellDataComponent implements OnInit {

  public cellData: any[];
  public cellNames: string[];
 
  constructor(private cellDataService: CellDataService) {
  
  }
 
  ngOnInit(): void {
    
    this.cellDataService.getAllCellsData().subscribe((allCellData : batteryDataModel[]) =>{

     /**
      * To get the first element of the JSON data objects array, get the keys of element
      * to fill dropdown list and add --Select-- at the top of the list
      */ 

      this.cellNames = Object.keys(allCellData[0]).filter(c => c !=='date');
      this.cellNames = ['-- Select Cell --'].concat(this.cellNames);
    }, error => {
      console.error(error);
    })
   }

  onChangeCell = (event) => {
    let selectedValue = event.target.value;
    if(selectedValue !== '-- Select Cell --'){
      this.cellDataService.getAllCellsData().subscribe((allCellData : batteryDataModel[]) =>{
        let cells = [], selectedCell = selectedValue;
        allCellData.forEach(function(values){
          let innerCell = Object.keys(values).filter(c => c === selectedCell).reduce((r, k) => r.concat(values[k]), []).toString(), 
            innerTime = Object.keys(values).filter(c => c === 'date').reduce((r, k) => r.concat(values[k]), []).toString();
      
          cells.push({'date': new Date(innerTime), 'value': parseFloat(innerCell)});
        });
    
        //Pushing processed value to cellData
        this.cellData = cells;
       }, error => {
        console.error(error);
      })
    }
  }
 }
