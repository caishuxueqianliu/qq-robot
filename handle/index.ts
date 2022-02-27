import { Client } from 'oicq'
const exec = require('child_process').exec;

/**
 * 自定义指令
 * @param client
 * @param data
 * @param str
 */
function custom (client:Client, data:any,str:string) {
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

/**
 * clone clent项目
 * @param client
 * @param data
 * @param name
 */
function clone_client (client:Client, data:any,name:string) {
    let str = 'cd ../client' + '&&git clone ' + name
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

/**
 * clone server项目
 * @param client
 * @param data
 * @param name
 */
function clone_server (client:Client, data:any,name:string) {
    let str = 'cd ../server' + '&&git clone ' + name
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

/**
 * 更新代码
 * @param client
 * @param data
 * @param name /server/xxx | /client/xxx
 */
function pull (client:Client, data:any,name:string) {
    let str = 'cd ..' + name + '&&git pull'
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

/**
 * 安装依赖
 * @param client
 * @param data
 * @param name /server/xxx | /client/xxx
 */
function npm (client:Client, data:any,name:string) {
    let str = 'cd ..' + name + '&&npm install'
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


/**
 * client项目打包
 * @param client
 * @param data
 * @param name /server/xxx | /client/xxx
 */
function build (client:Client, data:any,name:string) {
    let str = 'cd ..' + name + '&&npm run build'
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
    custom,
    pull,
    npm,
    build,
    clone_client,
    clone_server
}
