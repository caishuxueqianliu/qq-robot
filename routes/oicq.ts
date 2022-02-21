import {Console} from "inspector";

const express = require('express');
const router = express.Router();
const cryto = require('crypto')
const oicq = require("oicq")
const zaoCi = require('../config/zao')
const kuaCi = require('../config/kua')
const defaultConfig = require('../config/config');
import {Router, Request, Response, NextFunction} from 'express';


// 图片配置
const xianList =
    defaultConfig.xianList
// 群配置
const qunList =
    defaultConfig.qunList
// 托管的QQ号配置
const {
    uin,
    pwd
} =
    defaultConfig.account

const password_md5 = cryto.createHash('md5').update(pwd).digest('hex')
const config = {
    platform: 3, //登陆类型 1手机 2平板 3手表(不支持部分群事件)
    // log_level: "info", //日志级别，有trace,debug,info,warn,error,fatal,off
    log_level: "off", //日志级别，有trace,debug,info,warn,error,fatal,off
    kickoff: false, //被挤下线是否在3秒后反挤对方
    ignore_self: true, //群聊是否无视自己的发言
}
const client = oicq.createClient(uin, config);
client.login(password_md5);

// 登录
client.on("system.login.captcha", () => {
    process.stdin.once("data", input => {
        client.captchaLogin(input);
    });
});

// 监听信息
client.on("message", (data:any) => {
    console.log(data.message)
    // 私聊小助手时
    // if (data.message_type == "private") {
    //     setTimeout(() => {
    //         defaultMessage(data)
    //     }, 0)
    // }

    if (qunList[data.group_id]) {
        // @小助手时处理
        if (data.message[0].type == "at" && data.message[0].qq == uin) {
            //    // 处理消息
            let text = data.message.length ? data.message[1].text : ''
            setTimeout(() => {
                messageProcess(data, text)
            }, 0)
        }

    }
});
client.on("request", (data:any) => console.log(data));
client.on("notice", (data:any) => console.log(data));



// 消息处理函数
function messageProcess(data:any, text:string) {
    let sex = data.sender.sex == "male" ? '靓仔' : '靓妹'
    text = text.replace(/^\s*|\s*$/g,"");
    switch (text) {
        case "再见":
            // qunList[data.group_id].ka = false
            client.sendGroupMsg(data.group_id, `呜呜呜～小可爱再见呀！`)
            break
        case "fw":
            // qunList[data.group_id].ka = false
            client.sendGroupMsg(data.group_id, `呜呜呜～fwddw！`)
            break
        // case "安静":
        //     // qunList[data.group_id].ka = false
        //    // client.sendGroupMsg(data.group_id, `呜呜呜～小可爱再见呀！\n [CQ:image,cache=0,file=http://localhost:1001/images/ku.jpg]`)
        //     break
        default:
            break
        // client.sendGroupMsg(data.group_id, `${sex}小助手现在能为你做的事情为
        // 1.定时任务
        //   每日8点报每日任务（数据来源为b站up：彤鱼不吃鱼吖_），每周报最新复刻信息（数据来源于豆瓣小组(放我出赶due)的返场先祖记录贴）\n
        // 2.聊天关键词(消息携带)
        //   (每日任务｜今日任务) 会触发小助手私聊每日任务
        //   (近期先祖｜最新复刻) 会触发小助手私聊最新复刻信息
        //   (先祖在哪里｜先祖位置) 会触发小助手私聊询问你想知道哪里先祖的位置，回答小助手会发送对应攻略
        //   (小金人在哪里｜小金人位置) 会触发小助手私聊询问你想知道哪里小金人的位置，回答小助手会发送对应攻略
        //   (近期活动) 会触发小助手私聊发送官方微博地址
        //   (群没有开启私聊的话请自行添加小助手）\n
        // 3.特殊功能
        //   @我 (1｜开启夸人模式｜夸我) 开启彩虹屁模式
        //   @我 (0｜再见｜安静) 关闭彩虹屁模式
        // `)
    }
}
router.get('/', function (req:Request, res:Response, next:NextFunction) {
    res.send('respond with a resource');
});

module.exports = router;
