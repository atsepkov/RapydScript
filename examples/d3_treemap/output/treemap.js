(function(){
    var margin, width, height, color, treemap, div;
    margin = {
        top: 40,
        right: 10,
        bottom: 10,
        left: 10
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    color = d3.scale.category20c();
    treemap = d3.layout.treemap().size([ width, height ]).sticky(true).value(function(d) {
        return d.size;
    });
    div = d3.select("body").append("div").style("position", "relative").style("width", width + margin.left + margin.right + "px").style("height", height + margin.top + margin.bottom + "px").style("left", margin.left + "px").style("top", margin.top + "px");
    d3.json("flare.json", function(error, root) {
        var node;
        node = div.datum(root).selectAll(".node").data(treemap.nodes).enter().append("div").attr("class", "node").call(position).style("background", function(d) {
            if (d.children) {
                return color(d.name);
            } else {
                return null;
            }
        }).text(function(d) {
            if (d.children) {
                return null;
            } else {
                return d.name;
            }
        });
        d3.selectAll("input").on("change", function change() {
            var value;
            if (this.value === "count") {
                value = function() {
                    return 1;
                };
            } else {
                value = function(d) {
                    return d.size;
                };
            }
            node.data(treemap.value(value).nodes).transition().duration(1500).call(position);
        });
    });
    function position() {
        this.style("left", function(d) {
            return d.x + "px";
        }).style("top", function(d) {
            return d.y + "px";
        }).style("width", function(d) {
            return Math.max(0, d.dx - 1) + "px";
        }).style("height", function(d) {
            return Math.max(0, d.dy - 1) + "px";
        });
    }
})();