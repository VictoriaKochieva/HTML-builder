const path = require('path');
const fs = require('fs');
const pathStyles = path.join(__dirname, 'styles');

fs.open(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
  if(err) throw err;
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

        for(let i = 0; i < arr.length; i++) {
          result.write(arr[i]);
        }
      });
    }
  });  
});