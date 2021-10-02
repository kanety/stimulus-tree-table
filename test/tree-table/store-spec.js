import { Application } from '@hotwired/stimulus';
import TreeTableController from 'index';

const application = Application.start();
application.register('tree-table', TreeTableController);

describe('index', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table data-controller="tree-table" data-tree-table-store-key-value="tree-table">
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
        <tr data-node-id="1.1.2" data-node-pid="1.1">
          <td>  
            <a href="#icon"></a>
            <span>1.1.2</span>
          </td>
        </tr>
      </table>
    `;
  });

  it('saves states', () => {
    $('[data-node-id="1"] a').click();
    expect($('[data-node-id="1"]').matches('.st-tree-table__node--closed')).toEqual(true);
  });

  it('loads states', () => {
    $('[data-node-id="1"] a').click();
    expect($('[data-node-id="1"]').matches('.st-tree-table__node--closed')).toEqual(false);
  });
});
