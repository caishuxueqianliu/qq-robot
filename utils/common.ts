/**
 * 共用的client处理
 * @param data
 * @param client
 * @param result
 * @param res
 */
function commonClient(data:any, client:any, result:string, res:any) {
    client.sendGroupMsg(data.group_id, [
        {type:"at", qq:data.sender.user_id},
        {type:"text", text:'\n' + result},
        {type:'text', text:'\n' + res}
    ])
}

module.exports = {
    commonClient
}
