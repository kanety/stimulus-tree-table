# stimulus-tree-table

A stimulus controller that attaches tree-like behavior to table.

## Dependencies

* @hotwired/stimulus 3.0

## Installation

Install from npm:

    $ npm install @kanety/stimulus-tree-table --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import TreeTableController from '@kanety/stimulus-tree-table';

const application = Application.start();
application.register('tree-table', TreeTableController);
```

Import css:

```css
@import '@kanety/stimulus-tree-table';
```

Build html with `data-node-id` and `data-node-pid` as follows:

```html
<table class="st-tree-table" data-controller="tree-table">
  <tr data-node-id="1">
    <td>
      <a href="#icon" class="st-tree-table__icon"></a>
      <span>1</span>
    </td>
    <td>text of 1</td>
  </tr>
  <tr data-node-id="1.1" data-node-pid="1">
    <td>
      <a href="#icon" class="st-tree-table__icon"></a>
      <span>1.1</span>
    </td>
    <td>text of 1.1</td>
  </tr>
  <tr data-node-id="1.1.1" data-node-pid="1.1">
    <td>
      <a href="#icon" class="st-tree-table__icon"></a>
      <span>1.1.1</span>
    </td>
    <td>text of 1.1.1</td>
  </tr>
  <tr data-node-id="1.1.2" data-node-pid="1.1">
    <td>
      <a href="#icon" class="st-tree-table__icon"></a>
      <span>1.1.2</span>
    </td>
    <td>text of 1.1.2</td>
  </tr>
</table>
```

### Options

#### margin-left

Set base `margin-left` of icon (default: 20).

```html
<table data-controller="tree-table"
       data-tree-table-margin-left-value="10">
</table>
```

#### store-key

Save node state to `sessionStorage`:

```html
<table data-controller="tree-table"
       data-tree-table-store-key-value="YOUR_KEY">
</table>
```

### Callbacks

Run callbacks when a node is opened or closed:

```javascript
let element = document.querySelector('[data-controller="tree-table"]');
element.addEventListener('tree-table:opened', (e) => {
  // e.detail.node: opened node
  console.log('opened: ' + e.detail.node.getAttribute('data-node-id'));
});
element.addEventListener('tree-table:closed', (e) => {
  // e.detail.node: closed node
  console.log('closed: ' + e.detail.node.getAttribute('data-node-id'));
});
```

### Event operations

Expand or collapse tree nodes:

```javascript
let element = document.querySelector('[data-controller="tree-table"]');
element.dispatchEvent(new CustomEvent('tree-table:expand'));
element.dispatchEvent(new CustomEvent('tree-table:collapse'));
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
