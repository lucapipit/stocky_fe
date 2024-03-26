 //escape string
 export const escapeString = (input) => {
    return input.replaceAll("\\", "\\\\").replaceAll("'", "\\'")/* .replaceAll("%", "\\%") */
}