export class DemoValueConverter {
    toView(value, options) {
        return value + options.param2 + options.param;
    }
}