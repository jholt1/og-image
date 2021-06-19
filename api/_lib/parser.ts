import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { authorName, tags = '', summary = '', time = '', readTime = '1' } = (query || {});

    if (Array.isArray(tags)) {
        throw new Error('Expected a single tags');
    }
    if (Array.isArray(time)) {
        throw new Error('Expected a single time');
    }
    if (Array.isArray(summary)) {
        throw new Error('Expected a single summary');
    }
    if (Array.isArray(readTime)) {
        throw new Error('Expected a single readTime');
    }
    if (Array.isArray(authorName)) {
        throw new Error('Expected a single authorName');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        authorName: authorName || 'Centrica Technology',
        tags,
        summary,
        time,
        readTime
    };

    return parsedRequest;
}
