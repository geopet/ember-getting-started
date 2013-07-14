Todos.EditTodoView = Ember.TextField.extend({
  classNames: ['edit'],

  insertNewLine: function() {
    this.get('controller').acceptChanges();
  },

  focusOut: function() {
    this.get('controller').acceptChanges();
  },

  didInsertElement: function() {
    this.$().focus();
  }
});
