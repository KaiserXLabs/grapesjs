module.exports = {
  run(editor, sender) {
    const bm = editor.BlockManager;
    const pn = editor.Panels;

    function filter() {
      var value = search.value.toLowerCase();
      var repository = dropdown.value;

      if (!(repository || value)) {
        bm.render();
        return;
      }

      var blocks = bm.getAll();
      if (repository) {
        blocks = blocks.filter(block => {
          return block.attributes.repository == repository
        });
      }
      if (value) {
        blocks = blocks.filter(block => {
          return block.attributes.label.toLowerCase().includes(value)
        });
      }
      bm.render(blocks)      
    }

    if (!this.blocks) {
      bm.render();
      const id = 'left-container';
      const panels = pn.getPanel(id) || pn.addPanel({id});
      const blocks = document.createElement('div');
      blocks.className = 'gjs-blocks-search-wrapper';
      
      var repository = document.createElement('select')
      repository.options.add(new Option('All', '', true))
      repository.addEventListener('change', filter);

      var repositories = bm.getAll().map(b => b.attributes.repository)
      console.log(repositories)
      //repositories = repositories.filter(r => r)
      repositories = new Set(repositories)
      //var repositories = new Set(bm.getAll().map(b => b.attributes.repository))

      //repositories = repositories.filter(r => r)
      
      for (var name of repositories) {
        var option = new Option(name, name);
        dropdown.options.add(option);
      }

      const searchWrapper = document.createElement('div');
      const search = document.createElement('input');
      searchWrapper.className = 'gjs-blocks-search-container';
      search.className = 'gjs-blocks-search';
      search.placeholder = 'Search ...'
      search.addEventListener("keyup", filter);

      searchWrapper.appendChild(search);
      searchWrapper.appendChild(repository);
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
