import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements - ensure it's available globally
console.log('🚀 Registering Swiper...');
register();
console.log('✅ Swiper registered');

// Ensure Swiper is available on window
window.Swiper = window.Swiper || {};

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
