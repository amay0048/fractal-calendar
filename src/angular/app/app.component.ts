import * as angular from 'angular'
import { toCamelCase } from './utils'

export class AppComponent implements ng.IComponentOptions {
    template = `
        <h1>Fractal Datepicker: angular1</h1>
        <h2>Example output: {{vm.selectedDate}}</h2>
        <fractal-calendar-picker selected-date="vm.selectedDate"></fractal-calendar-picker>
        <fractal-calendar-picker page-length="3"></fractal-calendar-picker>
    `
    controller = ['$scope',function($scope:any){
        this.selectedDate = null;
        $scope.$watch(() => this.selectedDate, function (newVal:any) {
            console.log('Scope Watch for Date Change: ' + newVal);
        });
    }]
    controllerAs = 'vm'
}
AppComponent.componentSelector = toCamelCase('fractal-app')