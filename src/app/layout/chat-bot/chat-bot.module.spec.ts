import { ChatBotModule } from './chat-bot.module';

describe('chatBotModule', () => {
    let chatBotModule: ChatBotModule;

    beforeEach(() => {
        chatBotModule = new ChatBotModule();
    });

    it('should create an instance', () => {
        expect(chatBotModule).toBeTruthy();
    });
});
