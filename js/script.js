var $ = go.GraphObject.make;
var myDiagram =
    $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center,
        "undoManager.isEnabled": true,
        layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
    });


myDiagram.nodeTemplate =
    $(go.Node, "Horizontal", { background: "#4d90fe" },
        $(go.Panel, "Auto",
            $(go.Shape, "RoundedRectangle",{ fill: "#4d90fe", stroke: "black" }, { strokeWidth: 1, stroke: null, name: "SHAPE"}),
            $(go.TextBlock,
                "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
            ),
            $("TreeExpanderButton")
        );
        myDiagram.linkTemplate =
        $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape, { strokeWidth: 3, stroke: "#555" })
        );

        var model = $(go.TreeModel); model.nodeDataArray = [
            { key: "1", name: "SmartApps", description: "Root Directory. Contains main html files"},
            { key: "2", parent: "1", name: "Node modules" },
            { key: "3", parent: "1", name: "src" },
            { key: "4", parent: "1", name: "typings" },
            { key: "5", parent: "3", name: "app", description: "This is where the meat of your AngularJS app will live." },
            { key: "6", parent: "3", name: "assets", description: "To keep assets of the site" },
            { key: "7", parent: "3", name: "dist", description: "Contains the minified and bundled css and js files for production" },
            { key: "8", parent: "5", name: "components", description: "The components folder will contain the actual sections for your Angular app." },
            { key: "9", parent: "5", name: "models" },
            { key: "10", parent: "5", name: "services" },
            { key: "11", parent: "5", name: "Shared", description: "The shared folder will contain the individual features that your app will have. These features will ideally be directives that you will want to reuse on multiple pages." },
            { key: "12", parent: "6", name: "images" },
            { key: "13", parent: "6", name: "json" },
            { key: "14", parent: "6", name: "plugins" },
            { key: "15", parent: "6", name: "shared styles" },
            { key: "16", parent: "8", name: "app-holder" },
            { key: "17", parent: "8", name: "footer" },
            { key: "18", parent: "8", name: "login" },
            { key: "19", parent: "8", name: "header" }
        ]; myDiagram.model = model;

     	var cxElement = document.getElementById("showDescription");
        myDiagram.addDiagramListener("ObjectSingleClicked",
            function(e) {
                var part = e.subject.part;
                var mousePt = myDiagram.lastInput.viewPoint;
                cxElement.style.position = "absolute";
                cxElement.style.zIndex = "100";
                cxElement.style.left = mousePt.x + "px";
    			cxElement.style.top = mousePt.y + "px";
    			cxElement.style.display = "block";
    			cxElement.innerHTML = e.subject.part.data.description;
            });