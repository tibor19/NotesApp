export class SettingsIndex {
    firstName = 'John';
    lastName = 'Doe';

    get fullName() : string {
        return this.firstName + ' ' + this.lastName;
    }

    submit(e: Event) {

        alert(this.fullName);
        console.log(e);
        // e.preventDefault();
    }
}
