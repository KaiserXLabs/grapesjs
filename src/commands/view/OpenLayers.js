const Layers = require('navigator');
const $ = Backbone.$;

module.exports = {
  run(editor) {
    const lm = editor.LayerManager;
    const pn = editor.Panels;

    if (!this.layers) {
      const id = 'left-container';
      const layers = document.createElement('div');
      this.panel = pn.getPanel(id) || pn.addPanel({ id });
      layers.appendChild(lm.render());
      this.panel.set('appendContent', layers).trigger('change:appendContent');
      this.layers = layers;
    }

    this.panel.set('visible', true);
    this.layers.style.display = 'block';
  },

  stop() {
    const layers = this.layers;
    const panel = this.panel;
    panel && panel.set('visible', false);
    layers && (layers.style.display = 'none');
  }
};
