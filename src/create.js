const axios = require('axios');
const { fnLoadingByOra } = require('../util/common')
const inquirer = require('inquirer')
const { promisify } = require('util');
const ora = require('ora');
const chalk = require('chalk');
const temp = require('../config')
let downloadGit = require('download-git-repo');
downloadGit = promisify(downloadGit); // 将downloadGit包装成promise

// 获取仓库列表
const fetchReopLists = async () => {
    // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
    const { data } = await axios.get('https://api.github.com/orgs/'+temp.Templatehouse+'/repos'); return data
};

module.exports = async (projectName) => {
    let repos = await fnLoadingByOra(fetchReopLists, chalk.blue('正在链接你的仓库...'));
    repos = repos.map((item) => item.name);
    const { repo } = await inquirer.prompt([
        {
            type: 'list',
            name: 'repo',
            message: '请选择一个项目模板',
            choices: repos
        }
    ]);
    if(!projectName){
        const { proname } = await inquirer.prompt([
            {
                type: 'text',
                name: 'proname',
                message: '请输入你创建项目文件夹的名称',
            }
        ]);
        projectName = proname
    }
    const spinner = ora("正在下载......");
    try {
        spinner.start();
        await downloadGit(temp.Templatehouse + "/" + repo, projectName + "/")
        spinner.succeed();
        console.log(chalk.blue("\n\tcd " + projectName  + '\n\tnpm install' + '\n'))
    } catch (error) {
        console.log(chalk.red(error))
    }
};