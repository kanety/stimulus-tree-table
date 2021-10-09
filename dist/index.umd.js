!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],t):(e||self).StimulusTreeTable=t(e.Stimulus)}(this,function(e){class t extends e.Controller{get nodes(){return this.scope.findAllElements("tr[data-node-id]")}get openedNodes(){return this.scope.findAllElements("tr[data-node-id]:not(.st-tree-table__node--closed)")}connect(){this.init(),this.load()}init(){this.nodes.forEach(e=>{this.hasChildren(e)||e.classList.add("st-tree-table__node--leaf","st-tree-table__node--closed")})}load(){var e=this.loadStates();if(e){var t=new Set(e);this.nodes.reverse().forEach(e=>{t.has(e.getAttribute("data-node-id"))?this.show(e):this.hide(e)})}}toggle(e){if(e.target.matches('a[href="#icon"]')){var t=e.target.closest("tr");t.matches(".st-tree-table__node--closed")?this.open(t):this.close(t),e.preventDefault()}}expand(e){this.nodes.forEach(e=>this.show(e)),this.saveStates()}collapse(e){this.nodes.forEach(e=>this.hide(e)),this.saveStates()}open(e){this.show(e),this.saveStates(),this.dispatch("opened",{detail:{node:e}})}show(e){e.classList.remove("st-tree-table__node--closed"),this.showDescs(e)}showDescs(e){this.children(e).forEach(e=>{e.classList.remove("st-tree-table__node--hidden"),e.matches(".st-tree-table__node--closed")||this.showDescs(e)})}close(e){this.hide(e),this.saveStates(),this.dispatch("closed",{detail:{node:e}})}hide(e){e.classList.add("st-tree-table__node--closed"),this.hideDescs(e)}hideDescs(e){this.children(e).forEach(e=>{e.classList.add("st-tree-table__node--hidden"),this.hideDescs(e)})}hasChildren(e){return 0!=this.children(e).length}children(e){var t=e.getAttribute("data-node-id");return this.scope.findAllElements('tr[data-node-pid="'+t+'"]')}loadStates(){if(this.storeKeyValue){var e=sessionStorage.getItem(this.storeKeyValue);return e?JSON.parse(e):null}}saveStates(){if(this.storeKeyValue){var e=this.openedNodes.map(e=>e.getAttribute("data-node-id"));sessionStorage.setItem(this.storeKeyValue,JSON.stringify(e))}}}return t.values={storeKey:String},t.actions=[["element","click->toggle"],["element",":expand->expand"],["element",":collapse->collapse"]],t});
//# sourceMappingURL=index.umd.js.map
