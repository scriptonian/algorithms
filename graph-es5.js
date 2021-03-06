function Graph() {
    this.vertices = [];
    this.adjacentList = new Map();
    this.numberOfEdges = 0;
}

Graph.prototype = {
    addVertex: function(v){
        //push vertex into the a vertices array
        this.vertices.push(v);
        //for each new vertex we add we need to create an empty array with
        //holds the connections to the list
        this.adjacentList.set(v, []);
    },
    //helper method for getting a vertex from the adjacency list
    getAdjacencyListVertex(vertex) {
        return this.adjacentList.get(vertex);        
    },
    //our edges hold connections to vertices. this adds an edge from vertex 
    //U to vertex V. this means that V will be in the adjacency list of U
    addEdge: function(u, v) {
        //first get the u vertex to you can push into its list
        var uVertex = this.getAdjacencyListVertex(u),
            vVertex = this.getAdjacencyListVertex(v);
        /*
        we are working with undirected graphs here so we put both vertices
        into each others adjacency list. If this was a directed graph we
        would do either step 1 or step 2
        */
        //Step 1 : push V into U's list
        uVertex.push(v);
        //Step 2: push U into V's list
        vVertex.push(u);  
        //increment count
        this.numberOfEdges++;
    },

    breathFirstSearch: function(startingVertex) {
        var color = [],
            distances = [],
            preceding = [],          
            queue = new Queue(),
            isEmptyQueue = true,
            //create an array of object
            setVertexColorsAndEdges = function() {
                for(var i = 0; i < this.vertices.length; i++) {
                    color[this.vertices[i]] = 'white';
                    distances[this.vertices[i]] = -1;
                    //we initialize all preceding distance to null with the exception
                    //of the current start vertex.
                    if(this.vertices[i] === startingVertex) {
                        distances[this.vertices[i]] = 0;
                        preceding[this.vertices[i]] = startingVertex;
                    } else {
                        preceding[this.vertices[i]] = null;
                    }                    
                }
            };
        
        //set colors and distances on all vertices
        setVertexColorsAndEdges();
        //enqueue vertex onto queue
        queue.enqueue(startingVertex);
        //continously check the queue and performs the following operations
        while(!queue.isEmpty()) {
            //get vertex in the front of queue
            var queueFrontVertex = queue.dequeue();
            //set the color to grey since is now visited
            color[queueFrontVertex] = 'grey';
            //get its adjacency list
            var frontVertexAdjLst = this.getAdjacencyListVertex(queueFrontVertex);
            frontVertexAdjLst.forEach(function(adjVertex){
                if(color[adjVertex] === 'white') {
                    //if color is white change to grey because we have now discovered it
                    color[adjVertex] = 'grey';
                    //since we initialized distances with -1, at the top we need to reset that
                    //to 1 and start counting properly. else we increase by 1
                    if(distances[queueFrontVertex] === -1) {
                        distances[queueFrontVertex] = 1;
                    } else {
                        //increment the edge distance count
                        distances[adjVertex] = distances[queueFrontVertex] + 1;
                    }
                    //record the path that lead from one vertex to another vertex. The preceding node
                    preceding[adjVertex] = queueFrontVertex;
                    //next add this to the queue
                    queue.enqueue(adjVertex);
                }
            });
            color[queueFrontVertex] = 'black';
            //console.log(queueFrontVertex + ' was visited');
        }
        //Output Shortest distance based on number of hops
        for (var i in distances) {
            //console.log('Shortest Distance from ' + startingVertex + ' to ' + i + ' is in ' + distances[i] + ' step(s)');
        }

        return {
            distances : distances,
            preceding : preceding
        };   
    },

    vertexExist: function(v) {
        return this.vertices.indexOf(v) >= 0;
    },

    shortestPathToAll: function(source, bfs) {
        //check to see if vertex exists
        if(!this.vertexExist(source)) {
            return console.log('Starting Vertex not found');
        }
        
        //since we already know how to output shortest path from source to destination
        //lets reuse our shortest path method
        for(var i = 0; i < this.vertices.length; i++) {
            var currentVertex = this.vertices[i];
            this.shortest_path(bfs, source, currentVertex);
        } 
    },

    shortest_path: function(bfs, source, destination) {
        //get the distance table array values
        var distances = bfs.distances,
            precedingNode = bfs.preceding,
            finalString,
            //use a stack to store the backtracking path
            path = new Stack();
        
        //the first to be added to the stack is a destination. however if source and destination
        //are the same, then there is no need to add the destination. If you dont see this, you will
        //see K-K or M-M in your output if K or M is your source. If source and destination are the same
        //simply just present K or M 
        if(!(source === destination)) {
            path.push(destination);
        } 
        
        //find the last preceding node in order to get to the source
        var previousVertex = precedingNode[destination];
        //console.log(previousVertext);
        
        //Perform backtracking
        while (previousVertex !== null && previousVertex !== source) {
            path.push(previousVertex);
            previousVertex = precedingNode[previousVertex];
        }
        
        if(previousVertex === null) {
            console.log('There is not path from ' + source + ' to ' + destination);
        } else { // the previous is equal to the source.
            //add the source
            path.push(source);
        }
        //print final results
        finalString = path.pop();
        while(!path.isEmpty()) {
            finalString += ' - ' + path.pop();
        }
        console.log(finalString);
    },

    DFS : function(v, color) {
        console.log('Visiting Vertex: ' + v);
        //change the color to grey
        color[v] = 'grey';
        //get its adjacency list
        var curVertexAdjLst = this.getAdjacencyListVertex(v);
        //go through the list, if you there unvisited linked 
        //follow the path to the end for each of
        var that = this;
        curVertexAdjLst.forEach(function(listVertex){
            if(color[listVertex] === 'white') {
                that.DFS(listVertex, color);
            }
        });
        //change the color to black. we are done
        color[v] = 'black';
    },

    DFSTraversal: function() {
        var color = [],        
        //set all vertices to white before search begin.
        initializeVertexColors = function() {
            for(var i = 0; i < this.vertices.length; i++) {
                color[this.vertices[i]] = 'white';                    
            }
        };
        //call the function to initialize colors
        initializeVertexColors();
        //run through all the vertices
        for(var i = 0; i < this.vertices.length; i++) {
            if(color[vertices[i]] === 'white') {
                this.DFS(vertices[i], color);
            }
        }
    },
    //DFS with a stack instead of recursion
    depthFirstWithStack: function(startingVertex) {
        var color = [], 
            stack = new Stack();
        //set all vertices to white before search begin.
        initializeVertexColors = function() {
            for(var i = 0; i < this.vertices.length; i++) {
                color[this.vertices[i]] = 'white';
            }
        };
        //call the function to initialize colors
        initializeVertexColors();
        //putsh vertex onto stack
        stack.push(startingVertex);
        //continue doing this as long as the stack is not empty
        while(!stack.isEmpty()) {
            //get vertex in the front of stack
            var stackFrontVertex = stack.pop();
            if(color[stackFrontVertex] !== 'black') {
                color[stackFrontVertex] = 'grey';
                console.log('Visiting Vertex: ' + stackFrontVertex);
                //get its adjacency list
                var frontVertexAdjLst = this.getAdjacencyListVertex(stackFrontVertex);
                //loop through list
                for(var i = 0; i < frontVertexAdjLst.length; i++) {
                    if (color[frontVertexAdjLst[i]] === 'white') {
                        stack.push(frontVertexAdjLst[i]);
                    }
                }
                color[stackFrontVertex] = 'black';
            }
        }
    },

    toString: function() {
        //mapValues is used to store all map values. which are arrays
        //we dont use the .values method here since that returns a
        //Map Iterator which is not so easy to work with in ES5,
        //but for ES2015 and beyond it will be much easier. For ES5
        //we use a foreach
        var mapValues = [];
        this.adjacentList.values().forEach(function(value, key, map) {
            mapValues.push(value);
        });

        //go through vertices and 
        for(var i = 0; i < vertices.length; i++) {
            var keyStr = '',
                valueStr = '';
            keyStr += vertices[i] + " -> ";
            for(var j = 0; j < mapValues[i].length; j++) {
                valueStr += mapValues[i][j];
            }
            keyStr += valueStr;
            console.log(keyStr);
            valueStr = '';
        }
    }
};

//create graph
var graph = new Graph();
//create an array of vertices to add to graph
var vertices = ['K','T','J','M','N','F'];
//iterate vertices and add each vertex to the graph
vertices.map(function(vertex){
    graph.addVertex(vertex);
});

//create edge connections
graph.addEdge('K', 'T');
graph.addEdge('K', 'M');
graph.addEdge('K', 'J');
graph.addEdge('T', 'M');
graph.addEdge('J', 'M');
graph.addEdge('J', 'F');
graph.addEdge('M', 'N');
graph.addEdge('M', 'F');

//graph.toString();
//graph.breathFirstSearch('K');

//var source = vertices[0];
//var destination = vertices[5];
//var bfs = graph.breathFirstSearch(source);
//console.log(bfs);
//graph.shortest_path(bfs, source, destination);
//graph.shortestPathToAll(source, bfs);

//var dfs = graph.DFSTraversal();
var dsf_stack = graph.depthFirstWithStack('K');