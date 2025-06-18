import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FeatherModule } from 'angular-feather';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexStroke,
  ApexLegend,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
  ApexGrid,
  ApexMarkers,
  ApexYAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  pieSeries?: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
}

export interface Project {
  projectName: string;
  projectTeam: Record<string, string>;
  teamLeader: string;
  priority: string;
  openTask: number;
  completedTask: number;
  status: number;
  document: string;
}

const ELEMENT_DATA: Project[] = [
  {
    projectName: 'Angular admin',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-1.jpg',
      emp2: 'assets/images/avatars/avatar-2.jpg',
      emp3: 'assets/images/avatars/avatar-3.jpg',
    },
    teamLeader: 'John Doe',
    priority: 'high',
    openTask: 20,
    completedTask: 347,
    status: 48,
    document: 'assets/doc/doc.xls',
  },
  {
    projectName: 'Java ERP',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-8.jpg',
      emp2: 'assets/images/avatars/avatar-5.jpg',
      emp3: 'assets/images/avatars/avatar-4.jpg',
    },
    teamLeader: 'Sarah Smith',
    priority: 'medium',
    openTask: 14,
    completedTask: 714,
    status: 55,
    document: 'assets/doc/doc.xls',
  },
  {
    projectName: 'Wordpress',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-9.jpg',
      emp2: 'assets/images/avatars/avatar-1.jpg',
      emp3: 'assets/images/avatars/avatar-5.jpg',
    },
    teamLeader: 'Ashton Cox',
    priority: 'high',
    openTask: 44,
    completedTask: 268,
    status: 74,
    document: 'assets/doc/doc.xls',
  },
  {
    projectName: 'IOS App',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-6.jpg',
      emp2: 'assets/images/avatars/avatar-2.jpg',
      emp3: 'assets/images/avatars/avatar-8.jpg',
    },
    teamLeader: 'Angelica Ramos',
    priority: 'low',
    openTask: 5,
    completedTask: 144,
    status: 25,
    document: 'assets/doc/doc.xls',
  },
  {
    projectName: 'Jasper report',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-2.jpg',
      emp2: 'assets/images/avatars/avatar-4.jpg',
      emp3: 'assets/images/avatars/avatar-6.jpg',
    },
    teamLeader: 'Cara Stevens',
    priority: 'medium',
    openTask: 11,
    completedTask: 257,
    status: 61,
    document: 'assets/doc/doc.xls',
  },
  {
    projectName: 'Angular admin',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-1.jpg',
      emp2: 'assets/images/avatars/avatar-2.jpg',
      emp3: 'assets/images/avatars/avatar-3.jpg',
    },
    teamLeader: 'John Doe',
    priority: 'high',
    openTask: 20,
    completedTask: 347,
    status: 48,
    document: 'assets/doc/doc.xls',
  },
  {
    projectName: 'Wordpress',
    projectTeam: {
      emp1: 'assets/images/avatars/avatar-9.jpg',
      emp2: 'assets/images/avatars/avatar-1.jpg',
      emp3: 'assets/images/avatars/avatar-5.jpg',
    },
    teamLeader: 'Ashton Cox',
    priority: 'high',
    openTask: 44,
    completedTask: 268,
    status: 74,
    document: 'assets/doc/doc.xls',
  },
];

@Component({
    selector: 'app-dashboard2',
    imports: [
        MatCardModule,
        MatButtonModule,
        FeatherModule,
        MatIconModule,
        NgApexchartsModule,
        MatTableModule,
        MatMenuModule,
        DatePipe,
        CommonModule,
        MatProgressBarModule,
        FeatherIconsComponent,
        NgScrollbar,
        MatCheckboxModule,
        CdkDropList,
        CdkDrag,
        CdkDragHandle,
        CdkDragPlaceholder,
    ],
    templateUrl: './dashboard2.component.html',
    styleUrl: './dashboard2.component.scss'
})
export class Dashboard2Component {
  public smallChart1Options!: Partial<ChartOptions>;
  public smallChart2Options!: Partial<ChartOptions>;
  public smallChart3Options!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public lineChartOptions!: Partial<ChartOptions>;
  public gaugeChartOptions1!: Partial<ChartOptions>;

  displayedColumns: string[] = [
    'projectName',
    'projectTeam',
    'teamLeader',
    'priority',
    'openTask',
    'completedTask',
    'status',
    'document',
    'actions',
  ];
  dataSource = ELEMENT_DATA;

  constructor() {
    this.smallChart1();
    this.smallChart2();
    this.smallChart3();
    this.barChart();
    this.lineChart();
    this.gaugeChart1();
  }
  getTeamMembers(projectTeam: Record<string, string>): string[] {
    return Object.values(projectTeam);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
  toggle(task: { done: boolean }) {
    task.done = !task.done;
  }
  private smallChart1() {
    this.smallChart1Options = {
      colors: ['#FF7F31'],
      series: [
        {
          name: 'Expense',
          data: [80, 135, 180, 75, 187, 140, 68, 132, 200],
        },
      ],
      chart: {
        height: 90,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '50%',
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'july',
          'aug',
          'sep',
        ],
        position: 'top',

        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  private smallChart2() {
    this.smallChart2Options = {
      colors: ['#12a147'],
      series: [
        {
          name: 'Profit',
          data: [90, 150, 280, 100, 280, 189, 105, 228, 278],
        },
      ],
      chart: {
        height: 90,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '50%',
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'july',
          'aug',
          'sep',
        ],
        position: 'top',

        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  private smallChart3() {
    this.smallChart3Options = {
      colors: ['#6366f1'],
      series: [
        {
          name: 'Sales',
          data: [80, 235, 120, 101, 210, 140, 80, 135, 200],
        },
      ],
      chart: {
        height: 90,
        type: 'bar',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: '50%',
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'july',
          'aug',
          'sep',
        ],
        position: 'top',

        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }
  private barChart() {
    this.barChartOptions = {
      series: [
        {
          name: 'Males',
          data: [2.4, 4.65, 2.88, 2.9, 3.9, 2.2, 3, 4.1, 3.9, 3],
        },
        {
          name: 'Females',
          data: [-3.8, -3.18, -2.4, -3.7, -3.96, -2.3, -3.1, -4, -4.1, -2.8],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#6236AF', '#F02769'],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '70%',
          columnWidth: '30%',
          borderRadius: 5,
          borderRadiusApplication: 'around',
          borderRadiusWhenStacked: 'all',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },

      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        borderColor: '#9aa0ac',
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          // text: 'Age',
        },
      },
      tooltip: {
        shared: false,
        theme: 'dark',
        x: {
          formatter: function (val) {
            return val.toString();
          },
        },
        y: {
          formatter: function (val) {
            return val.toString() + '%';
          },
        },
      },
      xaxis: {
        categories: [
          '90+',
          '80-89',
          '70-79',
          '60-69',
          '50-59',
          '40-49',
          '30-39',
          '20-29',
          '10-19',
          '0-9',
        ],
        title: {
          text: 'Percent',
        },
        labels: {
          formatter: function (val) {
            return Math.abs(Math.round(parseInt(val, 10))) + '%';
          },
        },
      },
    };
  }
  private lineChart() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Product 1',
          data: [80, 250, 30, 120, 260, 100, 180],
        },
        {
          name: 'Product 2',
          data: [85, 130, 85, 225, 80, 190, 120],
        },
      ],
      chart: {
        height: 360,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#6777EF', '#8B8697'],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
        borderColor: '#9aa0ac',
      },
      fill: {
        type: 'gradient',
        gradient: {
          gradientToColors: ['#54CA68', '#EF447C'],
          stops: [0, 50, 65, 91],
        },
      },
      markers: {
        size: 3,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      yaxis: {
        // opposite: true,
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
  private gaugeChart1() {
    this.gaugeChartOptions1 = {
      pieSeries: [67],
      chart: {
        height: 200,
        type: 'radialBar',
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
            },
          },
        },
      },
      colors: ['#F67B0E', '#D6D6D6'],
      stroke: {
        dashArray: 4,
      },
      labels: ['Storage Ratio'],
    };
  }

  // TODO start
  tasks = [
    {
      id: '1',
      title: 'Submit Science Homework',
      done: true,
      priority: 'High',
    },
    {
      id: '2',
      title: 'Request for festivle holiday',
      done: false,
      priority: 'High',
    },
    {
      id: '3',
      title: 'Order new java book',
      done: false,
      priority: 'Low',
    },
    {
      id: '4',
      title: 'Remind for lunch in hotel',
      done: true,
      priority: 'Normal',
    },
    {
      id: '5',
      title: 'Pay Hostel Fees',
      done: false,
      priority: 'High',
    },
    {
      id: '6',
      title: 'Attend Seminar On Sunday',
      done: false,
      priority: 'Normal',
    },
    {
      id: '7',
      title: 'Renew bus pass',
      done: true,
      priority: 'High',
    },
    {
      id: '8',
      title: 'Issue book in library',
      done: false,
      priority: 'High',
    },
    {
      id: '9',
      title: 'Project report submit',
      done: false,
      priority: 'Low',
    },
  ];
}
