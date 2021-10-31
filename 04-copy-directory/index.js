const fs = require('fs');
const path = require('path');
const { stdout } = process;
fs.access(path.join(__dirname, 'files-copy'), err => {
  if(err) {
    fs.mkdir(path.join(__dirname, 'files-copy'),{recursive: true}, err=>{
      if(err) throw err;
    });
  }
});

fs.readdir(path.join(__dirname, 'files'), (err,data)=>{
  if(err) throw err;

  data.forEach(file => {
    fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err=>{
      if(err) throw err;
    });
  });

  stdout.write('Copied!\n');
});