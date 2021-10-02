import { Application } from '@hotwired/stimulus';
import TreeTableController from 'index';

const application = Application.start();
application.register('tree-table', TreeTableController);

describe('expand', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table data-controller="tree-table">
        <tr data-node-id="1">
          <td>
            <a href="#icon"></a>
            <span>1</span>
          </td>
        </tr>
        <tr data-node-id="1.1" data-node-pid="1">
          <td>
            <a href="#icon"></a>
            <span>1.1</span>
          </td>
        </tr>
        <tr data-node-id="1.1.1" data-node-pid="1.1">
          <td>
            <a href="#icon"></a>
            <span>1.1.1</span>
          </td>
        </tr>
      </table>
    `;
  });

  it('expands and collapses', () => {
    $('[data-controller="tree-table"]').dispatchEvent(new CustomEvent('tree-table:collapse'));
    expect($('[data-node-id="1"]').matches('.st-tree-table__node--closed')).toEqual(true);
    expect($('[data-node-id="1.1"]').matches('.st-tree-table__node--closed')).toEqual(true);

    $('[data-controller="tree-table"]').dispatchEvent(new CustomEvent('tree-table:expand'));
    expect($('[data-node-id="1"]').matches('.st-tree-table__node--closed')).toEqual(false);
    expect($('[data-node-id="1.1"]').matches('.st-tree-table__node--closed')).toEqual(false);
  });
});
