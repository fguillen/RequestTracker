console.log("app.js");

_.templateSettings = {
  interpolate : /\{\{([\s\S]+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};

var App = {};

$(function(){
  App.RequestTracker = Backbone.Model.extend({
  });

  App.RequestTrackerCollection = Backbone.Collection.extend({
    model: App.RequestTracker,
  });

  App.RequestTrackerView = Backbone.View.extend({
    template: _.template($('#request_tracker_template').html()),
    tagName: "li",

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }

  });

  App.RequestTrackerCollectionView = Backbone.View.extend({
    el: "#requests_tracker #requests_tracker_list",

    initialize: function(){
      console.log("ListView.initialize");
      this.collection.bind("reset", this.addAll, this);
      this.collection.bind("add", this.addOne, this);
    },

    addOne: function(model) {
      console.log("RequestTrackerCollectionView.addOne", model);
      var view = new App.RequestTrackerView({
        model: model
      });

      this.$el.append(view.render().el);
    },

    addAll: function() {
      this.collection.each(this.addOne);
    },
  });
});


$(function(){
  var requestTrackerCollection = new App.RequestTrackerCollection();
  var requestTrackerCollectionView =
    new App.RequestTrackerCollectionView({
      collection: requestTrackerCollection
    });

  requestTrackerCollection.add(
    [
      {
        server: "serverXX",
        browser: "browserXX",
      },
      {
        server: "server2",
        browser: "browser2",
      },
    ]
  );
});