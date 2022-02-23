import { Client } from 'oicq'
const exec = require('child_process').exec;
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


function test (client:Client, data:any,str:string) {
    const ls = exec(str);

    ls.stdout.on('data', (res:any) => {
        client.sendGroupMsg(data.group_id, [
            {type:"at",qq:data.sender.user_id},
            {type:'text',text:'\n' + res}
        ])
    });

    ls.stderr.on('data', (err:any)=> {
        client.sendGroupMsg(data.group_id, [
            {type:"at",qq:data.sender.user_id},
            {type:'text',text:'\n' + err}
        ])
    });

    ls.on('close', (code:any) => {
        console.log(`child process exited with code ${code}`);
    });


}



module.exports = {
    fw,
    test
}
