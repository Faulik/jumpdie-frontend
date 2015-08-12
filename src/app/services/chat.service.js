const ROOTSCOPE = new WeakMap();

class chatService {
  constructor($rootScope) {
    ROOTSCOPE.set(this, $rootScope);

    this.ws = new WebSocket("ws://192.168.1.44/message");
    this.messages = [{'user':'server', 'text':'connecting...'}];

    this.ws.onmessage = angular.bind(this, this.handleOnMessage);
    this.ws.onclose = angular.bind(this, this.handleOnClose);
  }

  handleOnMessage(e) {
    let data = JSON.parse(e.data);

    switch (data.channel) {
     case 'webchat':
        this.handleMessage(data);
        break;
     case 'chatuser':
        this.handleChatUserEvents(data);
        break;
    }
    ROOTSCOPE.get(this).$apply();
  }

  handleChatUserEvents(data) {
    if (data.message === 'joined'){
      this.messages.push({'user': data.user, 'text': 'joined the chat'})
    } else {
      this.messages.push({'user': data.user, 'text': 'left the chat'})
    }
  }

  handleMessage(data) {
    this.messages.push({'user': data.user, 'text': data.message})
  }

  handleOnClose() {
    this.messages.push({'user': 'server', 'text': 'closing...'})
  }

  sendMessage(msg) {
    this.ws.send(msg);
  }

}

export default angular.module('app.chat-service', [])
  .service('chatService', chatService)
  .name;