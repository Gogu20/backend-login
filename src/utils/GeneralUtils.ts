
export function capitalizeFirstLetter(input: string): string {  
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export function processArrayIntoString(array: Array<string>): string {
    let string: string = array[0];
    for (let i = 1; i < array.length; i += 1) {
        string = string + ", " + array[i];
    }
    return string;
}

export function bundleErrorsFromArray(array: Array<string> | undefined): string | undefined {
    if (array === undefined) {
        return undefined;
    }
    let string: string = array[0];
    for (let i = 1; i < array.length; i += 1) {
        string = string + " " + array[i];
    }
    return string;
}
