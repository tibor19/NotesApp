import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';

@inject(DialogController)
export class MessageBox {

    model;

    constructor(private dialogController: DialogController) {
    }

    activate(model) {
        this.model = model;
    }

    selectOption(option) {
        if (isCancel(option)) {
            this.dialogController.cancel(option);
        } else {
            this.dialogController.ok(option);
        }
    }
}

function isCancel(option) {
    return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
}