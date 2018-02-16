module.exports = {
  run(editor, sender) {
    const bm = editor.BlockManager;
    const pn = editor.Panels;

    if (!this.blocks) {
      bm.render();
      const id = 'left-container';
      const panels = pn.getPanel(id) || pn.addPanel({id});
      const blocks = document.createElement('div');
      const searchWrapper = document.createElement('div');
      const search = document.createElement('input');

      blocks.className = 'gjs-blocks-search-wrapper';
      searchWrapper.className = 'gjs-blocks-search-container';
      search.className = 'gjs-blocks-search';
      search.placeholder = 'Search ...'
      search.addEventListener("keyup", function() {
        const blocks = bm.getAll();
        const value = this.value.toLowerCase();

        if (value) {
          bm.render(blocks.filter(
            block => block.attributes.label.toLowerCase().includes(value)
          ));
        } else {
          bm.render();
        }
      });

      searchWrapper.appendChild(search);
      blocks.appendChild(searchWrapper);
      blocks.appendChild(bm.getContainer());
      panels.set('appendContent', blocks).trigger('change:appendContent');
      this.blocks = blocks;
      this.panel = panels;
    }

    this.panel.set('visible', true);
    this.blocks.style.display = 'block';
  },

  stop() {
    const blocks = this.blocks;
    blocks && (blocks.style.display = 'none');

    const panel = this.panel;
    panel && panel.set('visible', false);
  }
};
