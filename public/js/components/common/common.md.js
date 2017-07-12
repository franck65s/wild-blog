import navbarComponent from './navbar'
// import algo1Component from './algo1'

let commonModule = angular.module('app.common', [])
    .component('navbar', navbarComponent)
    // .component('algo', algo1Component)
    .name

export default commonModule
