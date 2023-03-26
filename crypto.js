const crypto = require('crypto');
const fs = require('fs');

// task 1
function hashAndSavePass(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  const passwordData = {salt, hash};
  
  fs.writeFileSync('password.txt', JSON.stringify(passwordData));
  console.log('the password is hashed and stored in the file');
}

// task 2
function verificationPass(password, file) {
  const data = fs.readFileSync(file); 
  const {salt, hash} = JSON.parse(data); 
  const inputHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  const result = inputHash === hash;

  console.log(result ? `the passwords match `: `the passwords do not match` );
  return result;
}
 
// task *
const args = process.argv.slice(2);
const command=args[0];

if (command === 'hash') {
  const password = args[1];
  const file = args[2];
  try{
    hashAndSavePass(password, file)
  }catch (error){
    console.error('Error:', error);
  }
} else if (command === 'compare') {
const password=args[1];
const file=args[2];
try{
  verificationPass(password, file)
}catch (error){
  console.error('Error:', error);
}
} else {
  console.log('invalid action');
}
hashAndSavePass('8468376dft');
verificationPass('8468376dft', 'password.txt');
