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

  fs.readdir(path.join(__dirname, 'files-copy'), (err, data2) => {
    for(let i = 0, j = 0; i < data.length, j < data2.length; i++, j++) {
      if(data[i] !== data2[j]) {
        fs.unlink( path.join(__dirname, 'files-copy',data2[j]), err=> {
          if (err) throw err;
        });
      }
    }
  });

  stdout.write('Copied!\n');
});