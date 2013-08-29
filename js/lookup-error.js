var source_map = new sourceMap.SourceMapConsumer(map);

window.onerror = function(msg, filename, lineno, colno, err) {
        var orig = source_map.originalPositionFor({
                line: lineno,
                column: colno
        });
        alert(JSON.stringify(orig));
};