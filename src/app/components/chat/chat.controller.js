export default class ChatController {
  constructor(chatService) {
    this.service = chatService;
    this.messages = chatService.messages;
  }

  sendMessage() {
    this.service.sendMessage(this.message);
  }
}