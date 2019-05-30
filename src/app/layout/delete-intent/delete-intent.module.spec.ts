import { DeleteIntentModule } from './delete-intent.module';

describe('DeltetIntentModule', () => {
    let deltetIntentModule: DeleteIntentModule;

    beforeEach(() => {
        deltetIntentModule = new DeleteIntentModule();
    });

    it('should create an instance', () => {
        expect(deltetIntentModule).toBeTruthy();
    });
});
