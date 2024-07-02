import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function dirtyValues(
    dirtyFields: false | object | any,
    allValues: any
): object {
    if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues;

    return Object.fromEntries(
        Object.keys(dirtyFields).map((key) => [
            key,
            dirtyValues(dirtyFields[key], allValues[key]),
        ])
    );
}

export const convert2base64 = (file: any, setImage: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        setImage(reader?.result?.toString());
    };
    reader.readAsDataURL(file);
};
