const ora = require('ora');
// 封装loading效果
const fnLoadingByOra = async (fn, message) => {
    const spinner = ora(message);
    spinner.start();
    let result = await fn();
    spinner.succeed(); // 结束loading
    return result;
}


const mapActions = {
    create: {
        alias: 'c', //别名
        description: '创建一个项目', // 描述
        examples: [ //用法
            'lee-cli create <project-name>'
        ]
    },
    '*': {
        alias: '', //别名
        description: 'command not found', // 描述
        examples: [] //用法
    }
}


module.exports = {
    mapActions,
    fnLoadingByOra
};
