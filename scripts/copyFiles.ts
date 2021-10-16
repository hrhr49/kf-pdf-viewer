const shell = require('shelljs');

shell.cp('-r', 'node_modules/pdfjs-dist/cmaps/', 'public/')
shell.cp('node_modules/pdfjs-dist/build/pdf.worker.js', 'public/')
