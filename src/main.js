const program = require('commander');
const path = require('path')
const { version } = require('../util/constants');
const figlet = require('figlet');
const { mapActions } = require('../util/common');
const chalk = require('chalk');

Reflect.ownKeys(mapActions).forEach((action) => {
    program.command(action) //配置命令的名字
        .alias(mapActions[action].alias) // 命令的别名
        .description(mapActions[action].description) // 命令对应的描述
        .action(() => {  //动作
            if (action === '*') {  //访问不到对应的命令 就打印找不到命令
                console.log(chalk.red(figlet.textSync('not    found')));
            } else {
                console.log(chalk.white(figlet.textSync('j h c - c l i')));
                // 第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径 
                // 第二个元素process.argv[1]——为当前执行的JavaScript文件路径 
                // 剩下是命令行中的参数
                require(path.join(__dirname,action))(...process.argv.slice(3));
            }
        })
})
program.on('--help', () => {
    console.log(chalk.yellow('\nExamples:'));
    Reflect.ownKeys(mapActions).forEach((action) => {
        mapActions[action].examples.forEach((example) => {
            console.log(`${example}`);
        })
    })
})

program.version('\n\t版本号'+chalk.blue(version)+'\n', "-v,--version").parse(process.argv)