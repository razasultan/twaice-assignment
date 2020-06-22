import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as d3 from "d3";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit, OnChanges {

  title = "Line Chart";
  //Accessing CellData from parent component
@Input() processedCellData: any[];

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private svg: any;
  private update : any;
  private line = d3.line(); // this is line defination


  constructor() {
    // configure margins and width/height of the graph
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.buildSvg();
  }

  ngOnChanges() {
    d3.selectAll('svg > g > *').remove();
    this.buildSvg();
  }
  private buildSvg() {
    this.svg = d3
      .select("svg")
      .append("g")
      //.attr('class', 'line')
      .attr("transform","translate(" + this.margin.left + "," + this.margin.top + ")");

     // range of data configuring
    //X domain
    this.xScale =  d3
      
      .scaleTime()
      .domain(d3.extent(this.processedCellData, (d) => d.date))
      .range([this.margin.left, this.width - this.margin.right]);

    //Y domain
    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.processedCellData, (d) => d.value)])
      .nice()
      .range([this.height - this.margin.bottom, this.margin.top]);
  

    // Configure the X Axis
    this.xAxis = this.svg.append("g")
      .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.xScale).ticks(this.width / 18).tickSizeOuter(0).tickFormat((d3.timeFormat("%H:%M:%S"))))
      .call((g) => g
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)"));
        

    // Configure the Y Axis
   this.yAxis = this.svg.append("g")
   
      .attr("transform", `translate(${this.margin.left},0)`)
      .call((g) => g.select(".domain").remove())
      .call(d3.axisLeft(this.yScale))
      .call((g) => g
          .select(".tick:last-of-type text")
          .clone()
          .attr("transform", "rotate(-90)")
          .attr("y", 7)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .attr("font-weight", "bold")
          .text("Voltage")
      );

       //Line Drawing
    this.line = d3.line()
    .x((d: any) => this.xScale(d.date))
    .y((d: any) => this.yScale(d.value));

  // Configuring line path
  this.svg
    .append("path")
    .datum(this.processedCellData)
    .attr("stroke-dashoffset", 0)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", this.line);
  }
}
