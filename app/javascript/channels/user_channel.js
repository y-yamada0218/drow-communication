import consumer from "./consumer"

consumer.subscriptions.create("UserChannel", {
  received: function(data) {
    $('#name-list').html('/');
    data.users.forEach(function(user) {
      $('#name-list').append(user.name)
    });
    return $('#name-list');
  },


  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },

  post: function() {
    return this.perform('post');
  }
});
