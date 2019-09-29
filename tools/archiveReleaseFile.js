const fs = require('fs');
const archiver = require('archiver');
const process = require('process');
const moment = require('moment');
const pkg = require('../package.json');


let output = fs.createWriteStream(`${__dirname}/../${pkg.name}_${pkg.version}_${moment().format('YYYY-MM-DD_HH:mm:ss')}.zip`);

const archive = archiver('zip');

const startTime = new Date().getTime();
console.log('正在打包...');

output.on('close', () => {
  const endTime = new Date().getTime();
  const elaspedTime = (endTime - startTime) / 1000;
  const filesize = (archive.pointer() / 1000 / 1000).toFixed(2); // MB
  console.log(`打包完成，包大小为：${filesize}MB，耗时：${elaspedTime}s`);
});

archive.on('error', (err) => {
  throw err;
});

archive.on('entry', (entry) => {
  if (!entry.name.match(/^node_modules/g) && entry.type === 'file') {
    console.log(`添加文件：${entry.name}`);
  }
});

const timestamp = new Date();

archive.pipe(output);

archive.directory('build', './build', { date: timestamp });
archive.directory('pm2', './pm2', { date: timestamp });
archive.directory('public', './public', { date: timestamp });
archive.file('.env.production', { date: timestamp });
archive.file('.yarnrc', { date: timestamp });
archive.file('package.json', { date: timestamp });
archive.file('server.js', { date: timestamp });
archive.file('yarn.lock', { date: timestamp });

require('child_process').exec('npm ls --production --parseable', (err, stdout) => {
  if (err) {
    // console.log(JSON.stringify(err))
  }
  const files = stdout.split('\n');
  files.forEach((f) => {
    const pos = f.indexOf('node_modules');
    if (pos !== -1) {
      const dir = f.substring(pos);
      console.log(`添加Node依赖：${dir}`);
      archive.directory(dir, true, { date: timestamp });
    }
  });
  archive.finalize();
});