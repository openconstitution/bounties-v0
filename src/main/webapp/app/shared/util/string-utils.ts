export const capitalizeFirst = (txt: string) => {
    txt = txt.toLowerCase()
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}
