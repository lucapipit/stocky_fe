 //escape string
 const escapeString = (input) => {
    return input.replace("\\", "\\\\").replaceAll("'", "\\'")/* .replaceAll("%", "\\%") */
}

export default escapeString