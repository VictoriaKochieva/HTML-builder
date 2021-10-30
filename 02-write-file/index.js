const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

stdout.write('Hello, write something below\n');

stdin.on('data', data => {
  stdout.write(data);
    
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
            
    (err) => {
      if(err) {
        throw err;
      }
    }
  );
});

stdin.on('data', data => {
  const dataSTR = data.toString().trim();
  if (dataSTR === 'exit') {
    stdout.write('Bye!');
    process.exit(0);
  }
});