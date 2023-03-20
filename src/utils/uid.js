export function generate() {
    const uniqueId = [];
    for (let i = 0; i < 5; i++) {
        uniqueId.push(makeId(6));
    }
    return uniqueId.join("-");
}

function makeId(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}
