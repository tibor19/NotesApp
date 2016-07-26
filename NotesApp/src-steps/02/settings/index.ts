export class SettingsIndex {
    firstName = 'John';
    lastName = 'Doe';

    get fullName() : string {
        return this.firstName + ' ' + this.lastName;
    }

    submit() {
        alert('Setting saved!');
    }
}
