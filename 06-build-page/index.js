const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

fs.mkdir(path.join(__dirname, 'project-dist'),{recursive: true}, err=>{
  if(err) throw err;
});

const template = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
const htmlBuild = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

template.pipe(htmlBuild);

//read HTML in project-dist and change el to tags content
fs.readFile(path.join(__dirname, 'project-dist', 'index.html'),'utf-8', (err, data) => {
  if(err) throw err;
    
  fs.readFile(path.join(__dirname, 'components', 'articles.html'),'utf-8', (err, articlesContent) => {      
    articlesContent = articlesContent.toString();     
    data = data.replace('{{articles}}', articlesContent);

    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),data,'utf-8', err => {
      if (err) throw err;
    });
  });

  fs.readFile(path.join(__dirname, 'components', 'header.html'),'utf-8', (err, headerContent) => {      
    headerContent = headerContent.toString();    
    data = data.replace('{{header}}', headerContent);

    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data,'utf-8', err => {
      if (err) throw err;
    });
  });

  fs.readFile(path.join(__dirname, 'components', 'footer.html'),'utf-8', (err, footerContent) => {      
    footerContent = footerContent.toString();    
    data = data.replace('{{footer}}', footerContent);
    
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data,'utf-8', err => {
      if (err) throw err;
    });
  });

  stdout.write('Builded!\n');
});

//create builded styles
const mergedStylesFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, data) => {
  if (err) throw err;

  data.forEach(file => {
    if(path.extname(file.name) === '.css') {
      let stylesPath = path.join(__dirname,'styles', file.name);
     
      fs.readFile(stylesPath, 'utf-8', (err, data) => {
        if(err) throw err;
        mergedStylesFile.write(data);
      });
    }
  });
});

//copy assets 

fs.readdir(path.join(__dirname, 'assets'),{withFileTypes: true}, (err, data) => {
  if(err) throw err;
  data.forEach (file => {
   
    console.log(file);
    let filePathes = path.join(__dirname, 'assets', file.name);

    copyAssets(filePathes);
    // console.log(filePathes);
    function copyAssets(value) {
  
      fs.stat(value, (err, stats) => {
        if(err) throw err;

        if(stats.isFile()) {
          fs.readFile(value, (err,data) => {
            if(err) throw err;
            // console.log(data);

            fs.writeFile(path.join(__dirname, 'project-dist','assets',file.name, path.basename(value)), data, err=> {
              if(err) throw err;
            });
          });
        } 
  
        if(stats.isDirectory()) {
          console.log(path.basename(value));
          
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', path.basename(value)), {recursive:true},err => {
            if(err) throw err;
          });

          let newDir = path.join(__dirname, 'assets', path.basename(value)); 

          fs.readdir(newDir,{withFileTypes: true}, (err, data) => {
            if(err) throw err;
            data.forEach (file => {
             
              console.log(file);
              let filePathes = path.join(__dirname, 'assets',path.basename(value), file.name);
              console.log(filePathes);
              copyAssets(filePathes);
            });
          });
        }
      });
    }
  });
});