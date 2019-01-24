import Vue from 'vue';
import components from './common/index';
Object.keys(components).forEach(tag => Vue.component('dash-'+tag, components[tag]));
