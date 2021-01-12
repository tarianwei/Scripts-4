/*
 * @Author: lxk0301 https://github.com/lxk0301
 * @Date: 2021-01-12 16:00:00 
 * @Last Modified by: TongLin138
 * @Last Modified time: 2021-01-12 16:00:00
 */

const $ = new Env('京喜农场');
let notify = ''; // nodejs 发送通知脚本
let notifyLevel = $.isNode() ? process.env.JXNC_NOTIFY_LEVEL || 3 : 3; // 通知级别 0=不通知;1=本次获得水滴>0;2=任务执行;3=任务执行+未种植种子;
let notifyBool = true; // 代码内部使用，控制是否通知
let cookieArr = []; // 用户 cookie 数组
let currentCookie = ''; // 当前用户 cookie
let tokenNull = {'farm_jstoken': '', 'phoneid': '', 'timestamp': ''}; // 内置一份空的 token
let tokenArr = []; // 用户 token 数组
let currentToken = {}; // 当前用户 token
const shareCode = '22bd6fbbabbaa77e7a1e8a'; // 内置助力码
let jxncShareCodeArr = []; // 用户 助力码 数组
let currentShareCode = []; // 当前用户 要助力的助力码
const openUrl = `openjd://virtual?params=${encodeURIComponent('{ "category": "jump", "des": "m", "url": "https://wqsh.jd.com/sns/201912/12/jxnc/detail.html?ptag=7155.9.32&smp=b47f4790d7b2a024e75279f55f6249b9&active=jdnc_1_chelizi1205_2"}',)}`; // 打开京喜农场
let subTitle = '', message = '', option = {'open-url': openUrl}; // 消息副标题，消息正文，消息扩展参数
const JXNC_API_HOST = 'https://wq.jd.com/';

$.detail = []; // 今日明细列表
$.helpTask = null;
$.allTask = []; // 任务列表
$.info = {}; // 用户信息
$.answer = 0;
$.drip = 0;
$.maxHelpNum = $.isNode() ? 8 : 3; // 助力 ret 1011 错误最大计数
$.helpNum = 0; // 当前账号 助力 ret 1011 次数
$.maxHelpSelfNum = 3; // 助力 自身 ret 1021 cannot help self 最大次数限制（防止随机API不停返回自身 code 导致死循环）
$.helpSelfNum = 0; // 当前账号 助力 ret 1021 cannot help self 次数
let assistUserShareCode = 0; // 随机助力用户 share code

!(async () => {
    await requireConfig();
    if (!cookieArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }

    for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i]) {
            currentCookie = cookieArr[i];
            $.UserName = decodeURIComponent(currentCookie.match(/pt_pin=(.+?);/) && currentCookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.log(`检查【京东账号${$.index}】${$.UserName} cookie 是否有效`);
            await TotalBean();
            $.log(`开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, {"open-url": "https://bean.m.jd.com/"});
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            subTitle = '';
            message = '';
            option = {};
            $.helpNum = 0;
            $.helpSelfNum = 0;
            await tokenFormat(); // 处理当前账号 token
            await shareCodesFormat(); // 处理当前账号 助力码
            await jdJXNC(); // 执行当前账号 主代码流程
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
        console.log(e);
    })
    .finally(() => {
        $.done();
    })

// 加载配置 cookie token shareCode
function requireConfig() {
    return new Promise(resolve => {
        $.log('开始获取配置文件\n')
        notify = $.isNode() ? require('./sendNotify') : '';
        notifyBool = notifyLevel > 0; // 初始化是否推送
        //Node.js用户请在jdCookie.js处填写京东ck;
        const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
        const jdTokenNode = $.isNode() ? require('./jdJxncTokens.js') : '';
        const jdJxncShareCodeNode = $.isNode() ? require('./jdJxncShareCodes.js') : '';
        //IOS等用户直接用NobyDa的jd cookie
        if ($.isNode()) {
            Object.keys(jdCookieNode).forEach((item) => {
                if (jdCookieNode[item]) {
                    cookieArr.push(jdCookieNode[item]);
                }
            })
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
            };
        } else {
            cookieArr.push(...[$.getdata('CookieJD'), $.getdata('CookieJD2')]);
        }

        $.log(`共${cookieArr.length}个京东账号\n`);

        if ($.isNode()) {
            Object.keys(jdTokenNode).forEach((item) => {
                tokenArr.push(jdTokenNode[item] ? JSON.parse(jdTokenNode[item]) : tokenNull)
            })
        } else {
            tokenArr.push(...[$.getdata('jxnc_token1') || tokenNull, $.getdata('jxnc_token2') || tokenNull]);
        }

        if ($.isNode()) {
            Object.keys(jdJxncShareCodeNode).forEach((item) => {
                if (jdJxncShareCodeNode[item]) {
                    jxncShareCodeArr.push(jdJxncShareCodeNode[item])
                }
            })
        }

        // console.log(`jdFruitShareArr::${JSON.stringify(jdFruitShareArr)}`)
        // console.log(`jdFruitShareArr账号长度::${jdFruitShareArr.length}`)
        $.log(`您提供了${jxncShareCodeArr.length}个账号的京喜农场助力码`);
        resolve()
    })
}

// 查询京东账户信息（检查 cookie 是否有效）
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": currentCookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        $.nickName = data['base'].nickname;
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

// 处理当前账号token
function tokenFormat() {
    return new Promise(async resolve => {
        if (tokenArr[$.index - 1] && tokenArr[$.index - 1].farm_jstoken) {
            currentToken = tokenArr[$.index - 1];
        } else {
            currentToken = tokenNull;
        }
        resolve();
    })
}

// 处理当前账号助力码
function shareCodesFormat() {
    return new Promise(async resolve => {
        // console.log(`第${$.index}个京东账号的助力码:::${jdFruitShareArr[$.index - 1]}`)
        if (jxncShareCodeArr[$.index - 1]) {
            currentShareCode = jxncShareCodeArr[$.index - 1].split('@');
            currentShareCode.push(...(shareCode.split('@')));
        } else {
            $.log(`由于您第${$.index}个京东账号未提供shareCode,将采纳本脚本自带的助力码`)
            currentShareCode = shareCode.split('@');
        }
        $.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify(currentShareCode)}`)
        resolve();
    })
}

async function jdJXNC() {
    subTitle = `【京东账号${$.index}】${$.nickName}`;
    $.log(`获取用户信息 & 任务列表`);
    const startInfo = await getTaskList();
    if (startInfo.prizename) {
        message += `【水果名称】${startInfo.prizename}\n`;
    }
    if (startInfo) {
        $.log(`【京东账号${$.index}（${$.nickName || $.UserName}）的${$.name}好友互助码】 ${$.info.smp}`);
        $.log(`【京东账号${$.index}（${$.nickName || $.UserName}）的${$.name}种子active】 ${$.info.active}`);
        await $.wait(500);
        const isOk = await browserTask();
        if (isOk) {
            await $.wait(500);
            await answerTask();
            await $.wait(500);
            const endInfo = await getTaskList();
            getMessage(endInfo, startInfo);
            await submitInviteId($.UserName);
            await $.wait(500);
            let next = await helpFriends();
            if (next) {
                while (true) {
                    assistUserShareCode = await getAssistUser();
                    if (assistUserShareCode) {
                        await $.wait(300);
                        next = await helpShareCode(assistUserShareCode);
                        if (next) {
                            await $.wait(200);
                            continue;
                        }
                    }
                    break;
                }
            }
        }
    }
    await showMsg()
}

// 获取任务列表与用户信息
function getTaskList() {
    return new Promise(async resolve => {
        $.get(taskUrl('query', `type=1`), async (err, resp, data) => {
            try {
                const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                const {detail, msg, task = [], retmsg, ...other} = JSON.parse(res);
                $.detail = detail;
                $.helpTask = task.filter(x => x.tasktype === 2)[0] || {eachtimeget: 0, limit: 0};
                $.allTask = task.filter(x => x.tasktype !== 3 && x.tasktype !== 2 && parseInt(x.left) > 0);
                $.info = other;
                $.log(`获取任务列表 ${retmsg} 总共${$.allTask.length}个任务！`);
                if (!$.info.active) {
                    $.log('账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。');
                    message += '账号未选择种子，请先去京喜农场选择种子。\n如果选择 APP 专属种子，必须提供 token。\n';
                    notifyBool = notifyBool && notifyLevel >= 3;
                    resolve(false);
                }
                resolve(other);
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(true);
            }
        });
    });
}

function browserTask() {
    return new Promise(async resolve => {
        const tasks = $.allTask.filter(x => x.tasklevel !== 6);
        const times = Math.max(...[...tasks].map(x => x.limit));
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            $.log(`开始第${i + 1}个任务：${task.taskname}`);
            const status = [0];
            for (let i = 0; i < times; i++) {
                const random = Math.random() * 3;
                await $.wait(random * 1000);
                if (status[0] === 0) {
                    status[0] = await doTask(task);
                }
                if (status[0] !== 0) {
                    break;
                }
            }
            if (status[0] === 1032) {
                $.log('任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子');
                message += '任务执行失败，种植的 APP 专属种子，请提供 token 或种植非 APP 种子\n';
                resolve(false);
                return;
            }

            $.log(`结束第${i + 1}个任务：${task.taskname}`);
        }
        resolve(true);
    });
}

function answerTask() {
    const _answerTask = $.allTask.filter(x => x.tasklevel === 6);
    if (!_answerTask || !_answerTask[0]) return;
    const {tasklevel, left, taskname, eachtimeget} = _answerTask[0];
    $.log(`准备做答题任务：${taskname}`);
    return new Promise(async resolve => {
        if (parseInt(left) <= 0) {
            resolve(false);
            $.log(`${taskname}[做任务]： 任务已完成，跳过`);
            return;
        }
        $.get(
            taskUrl(
                'dotask',
                `active=${$.info.active}&answer=${$.info.indexday}:${['A', 'B', 'C', 'D'][$.answer]}:0&joinnum=${
                    $.info.joinnum
                }&tasklevel=${tasklevel}`,
            ),
            async (err, resp, data) => {
                try {
                    const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                    let {ret, retmsg, right} = JSON.parse(res);
                    retmsg = retmsg !== '' ? retmsg : '成功';
                    $.log(`${taskname}[做任务]：ret:${ret} retmsg:"${retmsg.indexOf('活动太火爆了') !== -1 ? '任务进行中或者未到任务时间' : retmsg}"`);
                    if (ret === 0 && right === 1) {
                        $.drip += eachtimeget;
                    }
                    if (((ret !== 0 && ret !== 1029) || retmsg === 'ans err') && $.answer < 4) {
                        $.answer++;
                        await $.wait(1000);
                        await answerTask();
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve();
                }
            },
        );
    });
}

function getMessage(endInfo, startInfo) {
    const need = endInfo.target - endInfo.score;
    const get = endInfo.modifyscore; // 本地变更获得水滴
    const leaveGet = startInfo.modifyscore; // 离开时获得水滴
    let dayGet = 0; // 今日共获取水滴数
    if ($.detail) {
        let dayTime = new Date(new Date().toLocaleDateString()).getTime() / 1000; // 今日 0 点时间戳（10位数）
        $.detail.forEach(function (item, index) {
            if (item.time >= dayTime && item.score) {
                dayGet += item.score;
            }
        });
    }
    message += `【水滴】本次获得${get} 离线获得${leaveGet} 今日获得${dayGet} 还需水滴${need}\n`;
    if (get > 0 || leaveGet > 0 || dayGet > 0) {
        const day = parseInt(need / (dayGet > 0 ? dayGet : (get + leaveGet)));
        message += `【预测】还需 ${day} 天\n`;
    }
    if (get > 0 || leaveGet > 0) { // 本次 或 离线 有水滴
        notifyBool = notifyBool && notifyLevel >= 1;
    } else {
        notifyBool = notifyBool && notifyLevel >= 2;
    }
}

// 提交助力码
function submitInviteId(userName) {
    return new Promise(resolve => {
        if (!$.info || !$.info.smp) {
            resolve();
            return;
        }
        $.post(
            {
                url: `https://api.ninesix.cc/api/jx-nc/${$.info.smp}/${encodeURIComponent(userName)}?active=${$.info.active}`,
            },
            (err, resp, _data) => {
                try {
                    const {code, data = {}} = JSON.parse(_data);
                    $.log(`邀请码提交：${code}`);
                    if (data.value) {
                        message += '【邀请码】提交成功！\n';
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve();
                }
            },
        );
    });
}

function getAssistUser() {
    return new Promise(resolve => {
        $.get({url: `https://api.ninesix.cc/api/jx-nc?active=${$.info.active}`}, async (err, resp, _data) => {
            try {
                const {code, data = {}} = JSON.parse(_data);
                if (data.value) {
                    $.log(`获取随机助力码成功 ${code} ${data.value}`);
                    resolve(data.value);
                } else {
                    $.log(`获取随机助力码失败 ${code}`);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(false);
            }
        });
    });
}

// 为好友助力 return true 继续助力  false 助力结束
async function helpFriends() {
    for (let code of currentShareCode) {
        if (!code) {
            continue
        }
        const next = await helpShareCode(code);
        if (!next) {
            return false;
        }
    }
    return true;
}

// 执行助力 return true 继续助力  false 助力结束
function helpShareCode(code) {
    return new Promise(async resolve => {
        if (code === $.info.smp) { // 自己的助力码，跳过，继续执行
            $.log('助力码与当前账号相同，跳过助力。准备进行下一个助力');
            resolve(true);
        }
        $.log(`即将助力 share code：${code}`);
        $.get(
            taskUrl('help', `active=${$.info.active}&joinnum=${$.info.joinnum}&smp=${code}`),
            async (err, resp, data) => {
                try {
                    const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                    const {ret, retmsg = ''} = JSON.parse(res);
                    $.log(`助力结果：ret=${ret} retmsg="${retmsg ? retmsg : 'OK'}"`);
                    if (ret === 0) { // 0 助力成功
                        resolve(true);
                    }
                    if (ret === 1021) { // 1021 cannot help self 不能助力自己
                        $.helpSelfNum++;
                        if ($.helpSelfNum <= $.maxHelpSelfNum) {
                            resolve(true);
                        }
                    }
                    if (ret === 1011) { // 1011 active 不同
                        $.helpNum++;
                        if ($.helpNum <= $.maxHelpNum) {
                            resolve(true);
                        }
                    }
                    // ret 1016 助力上限
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(false);
                }
            },
        );
    });
}


function doTask({tasklevel, left, taskname, eachtimeget}) {
    return new Promise(async resolve => {
        if (parseInt(left) <= 0) {
            $.log(`${taskname}[做任务]： 任务已完成，跳过`);
            resolve(false);
        }
        $.get(
            taskUrl(
                'dotask',
                `active=${$.info.active}&answer=${$.info.indexday}:D:0&joinnum=${$.info.joinnum}&tasklevel=${tasklevel}`,
            ),
            (err, resp, data) => {
                try {
                    const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                    let {ret, retmsg} = JSON.parse(res);
                    retmsg = retmsg !== '' ? retmsg : '成功';
                    $.log(`${taskname}[做任务]：ret:${ret} retmsg:"${retmsg.indexOf('活动太火爆了') !== -1 ? '任务进行中或者未到任务时间' : retmsg}"`);
                    if (ret === 0) {
                        $.drip += eachtimeget;
                    }
                    resolve(ret);
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve();
                }
            },
        );
    });
}

function taskUrl(function_path, body) {
    return {
        url: `${JXNC_API_HOST}cubeactive/farm/${function_path}?${body}&farm_jstoken=${currentToken['farm_jstoken']}&phoneid=${currentToken['phoneid']}&timestamp=${currentToken['timestamp']}&sceneval=2&g_login_type=1&callback=whyour&_=${Date.now()}&g_ty=ls`,
        headers: {
            Cookie: currentCookie,
            Accept: `*/*`,
            Connection: `keep-alive`,
            Referer: `https://st.jingxi.com/pingou/dream_factory/index.html`,
            'Accept-Encoding': `gzip, deflate, br`,
            Host: `wq.jd.com`,
            'Accept-Language': `zh-cn`,
        },
    };
}

async function showMsg() {
    if (notifyBool) {
        $.msg($.name, subTitle, message, option);
        if ($.isNode()) {
            await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `${subTitle}\n${message}`);
        }
    }
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}