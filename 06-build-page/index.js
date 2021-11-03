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

  stdout.write('HTML builded!');
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

  stdout.write('Styles builded!\n');

});