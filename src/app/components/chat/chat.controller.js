export default class ChatController {
  constructor(chatService) {
    this.service = chatService;
    this.messages = chatService.messages;

  }

  sendMessage() {
    this.service.sendMessage(this.message);
    this.message = '';
  }

  handleKeyDown($event) {
    if($event.keyCode == 13 && $event.shiftKey === false) {
      this.sendMessage();
      $event.preventDefault();
    }
  }
}