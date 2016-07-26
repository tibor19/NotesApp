import {inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {MessageBox} from './message-box';

@inject(DialogService)
export class CommonDialogs {
    constructor(private dialogService: DialogService) {
    }

    showMessage(message: string, title : string = 'Message', options = ['Ok']) {
        return this.dialogService.open({ viewModel: MessageBox, model: { message, title, options } });
    }
}