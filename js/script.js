var $ = go.GraphObject.make;
var myDiagram =
    $(go.Diagram, "mainContainer", {
        initialContentAlignment: go.Spot.Center,
        "undoManager.isEnabled": true,
        layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
    });

myDiagram.nodeTemplate =
    $(go.Node, "Horizontal", { background: "#4d90fe" },
        $(go.Panel, "Auto",
            $(go.Shape, "RoundedRectangle",{ fill: "#4d90fe", stroke: "black" }, { strokeWidth: 1, stroke: null, name: "SHAPE"}),
            $(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))),
            $("TreeExpanderButton")
        );
myDiagram.linkTemplate =
	$(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
	    $(go.Shape, { strokeWidth: 3, stroke: "#555" })
);

var model = $(go.TreeModel); model.nodeDataArray = [
    { key: "1", name: "SmartApps", description: "Root Directory. Contains main html files"},
    { key: "2", parent: "1", name: "Node modules", description: "npm packages" },
    { key: "3", parent: "1", name: "src", description: "client side module wrapper" },
    { key: "4", parent: "1", name: "typings", description: "typings" },
    { key: "5", parent: "3", name: "app", description: "This is where the meat of your AngularJS app will live." },
    { key: "6", parent: "3", name: "assets", description: "To keep assets of the site" },
    { key: "8", parent: "5", name: "components", description: "The components folder will contain the actual sections for your Angular app." },
    { key: "9", parent: "5", name: "models",  description: "defines interfaces" },
    { key: "10", parent: "5", name: "services", description: "AngularJS services are substitutable objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app." },
    { key: "11", parent: "5", name: "Shared", description: "The shared folder will contain the individual features that your app will have. These features will ideally be directives that you will want to reuse on multiple pages." },
    { key: "12", parent: "6", name: "images", description: "contains images which are used by the application" },
    { key: "13", parent: "6", name: "json", description: "json data" },
    { key: "14", parent: "6", name: "plugins", description: "3rd party plugins" },
    { key: "15", parent: "6", name: "shared styles", description: "styles shared by different components" },
    { key: "16", parent: "8", name: "app-holder", description: "main component which contains sub components" },
    { key: "17", parent: "8", name: "footer", description: "application footer component" },
    { key: "18", parent: "8", name: "login", description: "application login component" },
    { key: "19", parent: "8", name: "header", description: "application header component" },
    { key: "20", parent: "8", name: "sidebar", description: "application footer component" },
    { key: "21", parent: "8", name: "widget", description: "application widget component" }
]; 

myDiagram.model = model;

var descElement = document.getElementById("showDescription");
myDiagram.addDiagramListener("ObjectSingleClicked",
    function(e) {
        var part = e.subject.part;
        var mousePt = myDiagram.lastInput.viewPoint;
        descElement.style.position = "absolute";
        descElement.style.zIndex = "100";
        descElement.style.left = mousePt.x + "px";
		descElement.style.top = mousePt.y + "px";
		descElement.style.display = "block";
		descElement.innerHTML = e.subject.part.data.description;
    });
       
myDiagram.addDiagramListener("BackgroundSingleClicked",
	function(){
		descElement.style.display = "none";
	});