export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const createPointer = (className, objectId) => ({ __type: "Pointer", className: className, objectId: objectId })

export const frequencyToString = (frequency) => {
    switch (frequency) {
        case 0:
            return "never";
        case 1:
            return "sometimes";
        case 2:
            return "often";
        case 3:
            return "very often";
        default:
            throw Error("Unknwown frequency: " + frequency);
    }
}