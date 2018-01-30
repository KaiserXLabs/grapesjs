const Layers = require('navigator');
const $ = Backbone.$;

module.exports = {
  run(em, sender) {
    if (!this.toAppend) {
      var collection = em.DomComponents.getComponent().get('components');
      var config = em.getConfig();
      var pfx = config.stylePrefix;
      var panels = em.Panels;
      var lyStylePfx = config.layers.stylePrefix || 'nv-';

      config.layers.stylePrefix = config.stylePrefix + lyStylePfx;
      config.layers.pStylePrefix = config.stylePrefix;
      config.layers.em = em.editor;
      config.layers.opened = em.editor.get('opened');

      // Check if panel exists otherwise crate it
      if(!panels.getPanel('left-container'))
        this.panel = panels.addPanel({id: 'left-container'});
      else
        this.panel = panels.getPanel('left-container');

      const toAppend = $(`<div class="${pfx}layers"></div>`);
      this.panel.set('appendContent', toAppend).trigger('change:appendContent');
      config.layers.sortContainer = toAppend.get(0);
      const layers = new Layers().init(collection, config.layers);
      this.$layers = layers.render();
      toAppend.append(this.$layers);
      this.toAppend = toAppend;
    }

    this.panel.set('visible', true).trigger('change:visibility');
    this.toAppend.show();
  },

  stop() {
    const panel =  this.panel;
    panel && panel.set('visible', false).trigger('change:visibility');
    this.toAppend && this.toAppend.hide();
  }
};
