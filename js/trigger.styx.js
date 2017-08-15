sx.build({
  name: 'Trigger',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    init: function() {
      this.el.click(this.handleClick.bind(this));
    },
    handleClick: function() {
      console.log(this.target);
      this.target.toggleClass(this.classname);
    }
  }
});
