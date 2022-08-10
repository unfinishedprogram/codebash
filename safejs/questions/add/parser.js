module.exports = function parse (peramiters) {
    return peramiters
        .split("\n")
        .filter(Boolean)
        .map( line => 
            line.split(',')
            .filter(Boolean)
            .map(Number)
        );
}