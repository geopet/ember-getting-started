Todos.TodosController = Ember.ArrayController.extend({
  createTodo: function() {
    // get the todo title set by the 'new todo' text field
    var title = this.get('newTitle');
    if (!title.trim()) { return; }

     // create the new todo model
     var todo = Todos.Todo.createRecord({
       title: title,
       isCompleted: false
     });

     // clear the 'new todo' text field
     this.set('newTitle', '');

     // save the new model
     todo.save();
  },

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterProperty('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  clearCompleted: function() {
    var completed = this.filterProperty('isCompleted', true);
    completed.invoke('deleteRecord');
    this.get('store').commit();
  },

  allAreDone: function(key, value) {
    if (value === undefined) {
      return !!this.get('length') && this.everyProperty('isCompleted', true);
    } else {
      this.setEach('isCompleted', true);
      this.get('store').save();
      return value;
    }
  }.property('@each.isCompleted'),

  remaining: function() {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')

});

