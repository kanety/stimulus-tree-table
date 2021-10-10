var e=require("@hotwired/stimulus");require("@kanety/stimulus-static-actions");class t{constructor(e){this.controller=e}get key(){return this.controller.storeKeyValue}get nodes(){return this.controller.nodes}get openedNodes(){return this.controller.openedNodes}load(){if(this.key){var e=this.constructor.load(this.key);if(e){var t=new Set(e);this.nodes.reverse().forEach(e=>{t.has(e.getAttribute("data-node-id"))?this.controller.show(e):this.controller.hide(e)})}}}save(){if(this.key){var e=this.openedNodes.map(e=>e.getAttribute("data-node-id"));this.constructor.save(this.key,e)}}static load(e){var t=sessionStorage.getItem(e);try{return JSON.parse(t)}catch(e){return null}}static save(e,t){sessionStorage.setItem(e,JSON.stringify(t))}}class s extends e.Controller{get nodes(){return this.scope.findAllElements("tr[data-node-id]")}get openedNodes(){return this.scope.findAllElements("tr[data-node-id]:not(.st-tree-table__node--closed)")}connect(){this.init(),this.store=new t(this),this.store.load()}init(){this.nodes.forEach(e=>{this.hasChildren(e)||e.classList.add("st-tree-table__node--leaf","st-tree-table__node--closed"),e.matches(".st-tree-table__node--closed")&&this.hide(e)})}toggle(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.closest("tr");t.matches(".st-tree-table__node--closed")?this.open(t):this.close(t),e.preventDefault()}}expand(e){this.nodes.forEach(e=>this.show(e)),this.store.save()}collapse(e){this.nodes.forEach(e=>this.hide(e)),this.store.save()}open(e){this.show(e),this.store.save(),this.dispatch("opened",{detail:{node:e}})}show(e){e.classList.remove("st-tree-table__node--closed"),this.showDescs(e)}showDescs(e){this.children(e).forEach(e=>{e.classList.remove("st-tree-table__node--hidden"),e.matches(".st-tree-table__node--closed")||this.showDescs(e)})}close(e){this.hide(e),this.store.save(),this.dispatch("closed",{detail:{node:e}})}hide(e){e.classList.add("st-tree-table__node--closed"),this.hideDescs(e)}hideDescs(e){this.children(e).forEach(e=>{e.classList.add("st-tree-table__node--hidden"),this.hideDescs(e)})}hasChildren(e){return 0!=this.children(e).length}children(e){var t=e.getAttribute("data-node-id");return this.scope.findAllElements('tr[data-node-pid="'+t+'"]')}}s.values={storeKey:String},s.actions=[["element","click->toggle"],["element",":expand->expand"],["element",":collapse->collapse"]],module.exports=s;
//# sourceMappingURL=index.js.map
