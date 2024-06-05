export function excludeField(model, keys) {
    return Object.fromEntries(
        Object.entries(model).filter(([key]) => !keys.includes(key))
    );
}
