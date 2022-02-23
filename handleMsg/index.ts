import { Client } from 'oicq'
/**
 * fw
 * @param client
 * @param data
 */
function fw(client:Client, data:any) {
    client.sendGroupMsg(data.group_id, [
        {type:"at",qq:313903714},
        {type:'text',text:'\n' + 'fw! 等着就行！ 晚上别睡太死！'}
    ])
}

/**
 * 呼叫fw
 * @param client
 * @param data
 */
function hjfw(client:Client, data:any) {
    client.sendGroupMsg(data.group_id, [
        {type:"at",qq:313903714},
        {type:'text',text:'\n' + '滴滴滴，fw快出来！'}
    ])
}




module.exports = {
    fw,
    hjfw
}
