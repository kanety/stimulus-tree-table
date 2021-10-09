import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static values = {
    storeKey: String
  };
  static actions = [
    ['element', 'click->toggle'],
    ['element', ':expand->expand'],
    ['element', ':collapse->collapse']
  ];

  get nodes() {
    return this.scope.findAllElements('tr[data-node-id]');
  }

  get openedNodes() {
    return this.scope.findAllElements('tr[data-node-id]:not(.st-tree-table__node--closed)');
  }

  connect() {
    this.init();
    this.load();
  }

  init() {
    this.nodes.forEach(node => {
      if (!this.hasChildren(node)) {
        node.classList.add('st-tree-table__node--leaf', 'st-tree-table__node--closed')
      }
    });
  }

  load() {
    let ids = this.loadStates();
    if (!ids) return;

    let idSet = new Set(ids);
    this.nodes.reverse().forEach(node => {
      if (idSet.has(node.getAttribute('data-node-id'))) {
        this.show(node)
      } else {
        this.hide(node);
      }
    });
  }

  toggle(e) {
    if (!e.target.matches('a[href="#icon"]')) return;

    let node = e.target.closest('tr');
    if (!node.matches('.st-tree-table__node--closed')) {
      this.close(node);
    } else {
      this.open(node);
    }

    e.preventDefault();
  }

  expand(e) {
    this.nodes.forEach(node => this.show(node));
    this.saveStates();
  }

  collapse(e) {
    this.nodes.forEach(node => this.hide(node));
    this.saveStates();
  }

  open(node) {
    this.show(node);
    this.saveStates();

    this.dispatch('opened', { detail: { node: node } });
  }

  show(node) {
    node.classList.remove('st-tree-table__node--closed')
    this.showDescs(node);
  }

  showDescs(node) {
    let children = this.children(node);
    children.forEach(child => {
      child.classList.remove('st-tree-table__node--hidden');
      if (!child.matches('.st-tree-table__node--closed')) {
        this.showDescs(child);
      }
    });
  }

  close(node) {
    this.hide(node);
    this.saveStates();

    this.dispatch('closed', { detail: { node: node } });
  }

  hide(node) {
    node.classList.add('st-tree-table__node--closed');
    this.hideDescs(node);
  }

  hideDescs(node) {
    let children = this.children(node);
    children.forEach(child => {
      child.classList.add('st-tree-table__node--hidden');
      this.hideDescs(child);
    });
  }

  hasChildren(node) {
    return this.children(node).length != 0;
  }

  children(node) {
    let id = node.getAttribute('data-node-id');
    return this.scope.findAllElements(`tr[data-node-pid="${id}"]`);
  }

  loadStates() {
    if (!this.storeKeyValue) return;

    let json = sessionStorage.getItem(this.storeKeyValue);
    return json ? JSON.parse(json) : null;
  }

  saveStates() {
    if (!this.storeKeyValue) return;

    let ids = this.openedNodes.map(node => node.getAttribute('data-node-id'));
    sessionStorage.setItem(this.storeKeyValue, JSON.stringify(ids));
  }
}
