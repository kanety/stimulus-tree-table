describe('index', () => {
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
        <tr data-node-id="1.1.2" data-node-pid="1.1">
          <td>  
            <a href="#icon"></a>
            <span>1.1.2</span>
          </td>
        </tr>
      </table>
    `;
  });

  it('opens or closes nodes', () => {
    $('tr[data-node-id="1.1"] a').click();
    expect($('tr[data-node-id="1.1"]').matches('.st-tree-table__node--closed')).toEqual(true);
    expect($('tr[data-node-id="1.1.1"]').matches('.st-tree-table__node--hidden')).toEqual(true);
    expect($('tr[data-node-id="1.1.2"]').matches('.st-tree-table__node--hidden')).toEqual(true);

    $('tr[data-node-id="1.1"] a').click();
    expect($('tr[data-node-id="1.1"]').matches('.st-tree-table__node--closed')).toEqual(false);
    expect($('tr[data-node-id="1.1.1"]').matches('.st-tree-table__node--hidden')).toEqual(false);
    expect($('tr[data-node-id="1.1.2"]').matches('.st-tree-table__node--hidden')).toEqual(false);
  });
});
