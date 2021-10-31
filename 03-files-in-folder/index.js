const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err,data) => {
  if(err) throw err;
  for (let i = 0; i < data.length; i++) {
    let file = data[i].name;
    const filePathes = path.join(__dirname,'secret-folder', file);

    fs.stat(filePathes, (err,stats) => {
      if(err) throw err;
      
      if(stats.isFile()) {       
        let fileName = file.split('.');
        let size = Math.round(stats.size * 0.01) + 'kb';
        let ext = path.extname(file).slice(1);
        stdout.write('\n' + path.basename(fileName[0]) + ' - ' + ext + ' - ' + size + '\n');
      }
    });    
  }
});