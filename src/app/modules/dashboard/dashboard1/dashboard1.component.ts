import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FeatherModule } from 'angular-feather';
import { MatIconModule } from '@angular/material/icon';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';

export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis: ApexYAxis;
  stroke?: ApexStroke;
  grid?: ApexGrid;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
  markers: ApexMarkers;
  dataLabels?: ApexDataLabels;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  colors: string[];
}

export interface InvoiceData {
  clientName: string;
  img: string;
  invoiceNo: number;
  dueDate: string;
  status: string;
  total: number;
}

const ELEMENT_DATA: InvoiceData[] = [
  {
    invoiceNo: 7865,
    img: 'assets/images/avatars/avatar-1.jpg',
    clientName: 'John Doe',
    dueDate: '2018-07-27T14:22:18Z',
    status: 'Paid',
    total: 347,
  },
  {
    invoiceNo: 2301,
    img: 'assets/images/avatars/avatar-2.jpg',
    clientName: 'Sarah Smith',
    dueDate: '2018-05-17T14:22:18Z',
    status: 'Paid',
    total: 756,
  },
  {
    invoiceNo: 2578,
    img: 'assets/images/avatars/avatar-3.jpg',
    clientName: 'Airi Satou',
    dueDate: '2018-11-11T14:22:18Z',
    status: 'Unpaid',
    total: 875,
  },
  {
    invoiceNo: 8657,
    img: 'assets/images/avatars/avatar-4.jpg',
    clientName: 'Ashton Cox',
    dueDate: '2018-09-05T14:22:18Z',
    status: 'Paid',
    total: 1025,
  },
  {
    invoiceNo: 1287,
    img: 'assets/images/avatars/avatar-5.jpg',
    clientName: 'Cara Stevens',
    dueDate: '2018-10-15T14:22:18Z',
    status: 'Unpaid',
    total: 352,
  },
  {
    invoiceNo: 3658,
    img: 'assets/images/avatars/avatar-6.jpg',
    clientName: 'Jacob Ryan',
    dueDate: '2018-02-21T14:22:18Z',
    status: 'Paid',
    total: 750,
  },
  {
    invoiceNo: 5598,
    img: 'assets/images/avatars/avatar-7.jpg',
    clientName: 'Pankaj Sharma',
    dueDate: '2018-03-14T14:22:18Z',
    status: 'Unpaid',
    total: 554,
  },
];

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    FeatherModule,
    MatIconModule,
    NgApexchartsModule,
    MatTableModule,
    DatePipe,
    MatProgressBarModule,
    MatMenuModule,
  ],
})
export class Dashboard1Component {
  public areaChartOptions!: Partial<ChartOptions>;
  public revenueOptions!: Partial<ChartOptions>;
  public delChartOptions!: Partial<ChartOptions>;
  public performanceRateChartOptions!: Partial<ChartOptions>;
  public smallBarChart!: Partial<ChartOptions>;
  public bannerChartOptions!: Partial<ChartOptions>;
  public dumbleChartOptions!: Partial<ChartOptions>;

  displayedColumns: string[] = [
    'invoiceNo',
    'clientName',
    'dueDate',
    'status',
    'total',
  ];
  dataSource = ELEMENT_DATA;

  public sampleData = [
    31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55,
  ];

  constructor() {
    this.areaChart();
    this.revenueChart();
    this.dealChart();
    this.performanceChart();
    this.smallChart();
    this.bannerChart();
    this.dumbleChart();
  }

  private areaChart() {
    // area chart

    this.areaChartOptions = {
      series: [
        {
          name: 'New Customers',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Repeat Customers',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#7D4988', '#66BB6A'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }
  private revenueChart() {
    this.revenueOptions = {
      series: [
        {
          name: 'Income',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Expense',
          data: [13, 23, 20, 8, 13, 27],
        },
      ],
      chart: {
        type: 'bar',
        height: 335,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ['#1E3D73', '#fb1c56'],
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              invoiceNo: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: 10,
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          '01/2011',
          '02/2011',
          '03/2011',
          '04/2011',
          '05/2011',
          '06/2011',
        ],
      },
      legend: {
        position: 'top',
        offsetY: 10,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  private dealChart() {
    this.delChartOptions = {
      series: [
        {
          name: 'Likes',
          data: [4, 3, 10, 9, 29, 19],
        },
      ],
      chart: {
        height: 150,
        type: 'line',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        width: 4,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000',
          '2/11/2000',
          '3/11/2000',
          '4/11/2000',
          '5/11/2000',
          '6/11/2000',
        ],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      yaxis: {
        min: -10,
        max: 40,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  private performanceChart() {
    this.performanceRateChartOptions = {
      series: [
        {
          name: 'Bill Amount',
          data: [113, 120, 130, 120, 125, 119, 126],
        },
      ],
      chart: {
        height: 300,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: '#9aa0ac',
        toolbar: {
          show: false,
        },
      },
      colors: ['#6777EF'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Bill Amount($)',
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private smallChart() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 250,
        height: 60,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'visitors',
          data: this.sampleData,
        },
      ],
      colors: ['#3D76D1'],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private bannerChart() {
    this.bannerChartOptions = {
      series: [
        {
          name: 'New Customer',
          data: [
            150, 161, 180, 150, 172, 152, 160, 141, 130, 145, 170, 140, 193,
            163, 150, 162,
          ],
        },
      ],
      chart: {
        height: 120,
        width: 250,
        type: 'area',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#E6792F'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          '16-07-2018',
          '17-07-2018',
          '18-07-2018',
          '19-07-2018',
          '20-07-2018',
          '21-07-2018',
          '22-07-2018',
          '23-07-2018',
          '24-07-2018',
          '25-07-2018',
          '26-07-2018',
          '27-07-2018',
          '28-07-2018',
          '29-07-2018',
          '30-07-2018',
          '31-07-2018',
        ],
      },
      legend: {
        show: false,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private dumbleChart() {
    this.dumbleChartOptions = {
      series: [
        {
          data: [
            {
              x: '2008',
              y: [2800, 4500],
            },
            {
              x: '2009',
              y: [3200, 5100],
            },
            {
              x: '2010',
              y: [2950, 7800],
            },
            {
              x: '2011',
              y: [3000, 4600],
            },
            {
              x: '2012',
              y: [3500, 5100],
            },
            {
              x: '2013',
              y: [4500, 6500],
            },
            {
              x: '2014',
              y: [4100, 5600],
            },
          ],
        },
      ],
      chart: {
        height: 235,
        type: 'rangeBar',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [['#008FFB', '#00E396']],
        },
      },
      legend: {
        show: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          gradientToColors: ['#00E396'],
          inverseColors: true,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        tickPlacement: 'on',
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
}
