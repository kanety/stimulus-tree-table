describe('callbacks', () => {
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

  let message;
  beforeEach(() => {
    let element = $('[data-controller="tree-table"]');
    element.addEventListener('tree-table:opened', e => {
      message = "opened: " + e.detail.node.getAttribute('data-node-id');
    });
    element.addEventListener('tree-table:closed', e => {
      message = "closed: " + e.detail.node.getAttribute('data-node-id');
    });
  });

  it('runs callbacks', () => {
    $('tr[data-node-id="1.1"] a').click();
    expect(message).toContain("closed: 1.1");
    $('tr[data-node-id="1.1"] a').click();
    expect(message).toContain("opened: 1.1");
  });
});
