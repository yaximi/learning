import { open } from 'node:fs/promises';
import { URL } from 'node:url';

let fd;
try {
    const fileUrl = new URL('./text.txt', import.meta.url)
    fd = await open(fileUrl);
    const text = await fd.readFile('utf8');
    console.log(text);
} finally {
    await fd?.close();
}
