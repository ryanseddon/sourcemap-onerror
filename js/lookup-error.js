var fizz_source_map = new sourceMap.SourceMapConsumer(fizzbuzz_map);
var test_source_map = new sourceMap.SourceMapConsumer(test_map);
var html = document.documentElement;

window.onerror = function(msg, filename, lineno, colno, err) {
    var source_map = test_source_map;
    if(/fizzbuzz/.test(filename)) {
        source_map = fizz_source_map;
    }
    var orig = source_map.originalPositionFor({
            line: lineno,
            column: colno
    });
    
    html.appendChild(document.createTextNode(JSON.stringify(orig)));
    //alert(JSON.stringify(orig));
};