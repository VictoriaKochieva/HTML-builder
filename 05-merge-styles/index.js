const path = require('path');
const fs = require('fs');
const { stdout } = require('process');
const pathStyles = path.join(__dirname, 'styles');

fs.access(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
  if(err) {
    fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
      if(err) throw err;
    });
  }
});

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const result = fs.createWriteStream(bundlePath);

fs.readdir(pathStyles, {withFyleTypes: true}, (err,data) => {
  if(err) throw err;
  data.forEach(file => {
    
    if(path.extname(file) === '.css') {
      const filePath = path.join(__dirname,'styles', file);
      
      fs.readFile(filePath,'utf-8', (err, data) => {
        
        if(err) throw err;
        let arr = [];
        arr.push(data.toString());
        
        result.write(arr.toString());
        // console.log(arr.toString());
      });
    }
  });  

  stdout.write('Merged!');
});