import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import Store from './store';
import './index.scss';

export default class extends Controller {
  static values = {
    marginLeft: { type: Number, default: 20 },
    storeKey: String
  };
  static actions = [
    ['element', 'click->toggle']
  ];

  get nodes() {
    return this.scope.findAllElements('tr[data-node-id]');
  }

  get openedNodes() {
    return this.scope.findAllElements('tr[data-node-id]:not(.st-tree-table__node--closed)');
  }

  connect() {
    this.init();
    this.store = new Store(this);
    this.store.load();
  }

  init() {
    this.nodes.forEach(node => {
      let icon = node.querySelector('a[href="#icon"]');
      if (icon && !icon.style.marginLeft && this.marginLeftValue) {
        icon.style.marginLeft = (this.depth(node) - 1) * this.marginLeftValue + 'px';
      }
      if (!this.hasChildren(node)) {
        node.classList.add('st-tree-table__node--leaf', 'st-tree-table__node--closed')
      }
      if (node.matches('.st-tree-table__node--closed')) {
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
    this.store.save();
    e.preventDefault();
  }

  collapse(e) {
    this.nodes.forEach(node => this.hide(node));
    this.store.save();
    e.preventDefault();
  }

  open(node) {
    this.show(node);
    this.store.save();

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
    this.store.save();

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

  parent(node) {
    let pid = node.getAttribute('data-node-pid');
    return this.scope.findElement(`tr[data-node-id="${pid}"]`);
  }

  children(node) {
    let id = node.getAttribute('data-node-id');
    return this.scope.findAllElements(`tr[data-node-pid="${id}"]`);
  }

  hasChildren(node) {
    return this.children(node).length != 0;
  }

  depth(node) {
    let parent = this.parent(node);
    if (parent) {
      return this.depth(parent) + 1;
    } else {
      return 1;
    }
  }
}
