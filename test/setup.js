global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

import { Application } from '@hotwired/stimulus';
import TreeTableController from 'index';

const application = Application.start();
application.register('tree-table', TreeTableController);
