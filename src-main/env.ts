import isDev from 'electron-is-dev'

// isDev = true -> ['../electron', '.',  ...]
// isDev = false -> ['my-app',  ...]
const argv = isDev ? process.argv.slice(2) : process.argv.slice(1);

let inputFile: string | null;

if (argv.length === 0) {
  inputFile = null;
} else {
  inputFile = argv.slice(-1)[0];
}

const getInputFile = () => inputFile;
const setInputFile = (filePath: string) => {
  inputFile = filePath;
};

export {
  isDev,
  // argv,
  getInputFile,
  setInputFile,
};
