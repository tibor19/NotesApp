
export class SettingsIndex {
    firstName = 'John';
    lastName = 'Doe';

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    submit() {
        alert('Setting saved!');
    }
}
