/**
 * 正则匹配svnURL
 * @param s
 */

function getSvnHttpURL(s:any) {
    let reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    s = s.match(reg);
    return(s)
}

module.exports = {
    getSvnHttpURL
}

