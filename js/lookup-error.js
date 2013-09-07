var fizz_source_map = new sourceMap.SourceMapConsumer(fizzbuzz_map);
var test_source_map = new sourceMap.SourceMapConsumer(test_map);
var catch_source_map = new sourceMap.SourceMapConsumer(catch_map);
var body = document.body;

function parseStackTrace(err) {
    var info;
    var source_map;

    if(err.mode === 'trycatch') {
        info = parseTryCatchStackTrace(err);
        source_map = catch_source_map;
    } else {
        info = err.stack;

        source_map = test_source_map;
        if(/fizzbuzz/.test(info.filename)) {
            source_map = fizz_source_map;
        }
    }
    
    
    var orig = source_map.originalPositionFor({
            line: info.line,
            column: info.column
    });

    orig.mode = err.mode;
    
    body.innerHTML += '<div class="error"><pre>' + JSON.stringify(orig, null, 4);
}

function parseTryCatchStackTrace(err) {
    var lines = err.stack.split('\n'),
        stack;

    stack = lines[1].split(':').reverse().splice(0, 2);

    return {
        column: stack[0],
        line: stack[1]
    };
}

window.onerror = function(msg, filename, lineno, colno, err) {
    var error = {
        err: err,
        stack: {
            message: msg,
            line: lineno,
            column: colno,
            filename: filename
        },
        mode: 'onerror'
    };

    parseStackTrace(error);
};