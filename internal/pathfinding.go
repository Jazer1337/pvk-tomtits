package internal

import (
	"math"
	"slices"
)

type Path struct {
	Cost  int
	Nodes []Node
}

// Include all nodes in `nodes` when finding path. Automatically adds `startNode` as end node.
func (g *Graph) FindShortestPathAll(startNode Node, nodes []Node) Path {

	nodes = append(nodes, startNode)

	pathCombined := Path{Nodes: []Node{startNode}}

	from := startNode

	for _, node := range nodes {

		// unnecessary to visit node again if already visited through some previous path
		if slices.Contains(pathCombined.Nodes, node) && node != nodes[len(nodes)-1] {
			continue
		}

		path := g.FindShortestPathBetween(from, node)
		from = node

		// don't append first node (was appended last iteration)
		pathCombined.Nodes = append(pathCombined.Nodes, path.Nodes[1:]...)
		pathCombined.Cost += path.Cost
	}

	return pathCombined
}

// Dijkstra's algorithm: find shortest path between nodes in weighted, directed graph.
// (pseudo code at: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
func (g *Graph) FindShortestPathBetween(startNode, endNode Node) Path {

	distanceTo := map[Node]int{}
	parentOf := map[Node]Node{}
	queue := []Node{}

	for _, v := range g.GetNodes() {
		distanceTo[v] = math.MaxInt
		parentOf[v] = Node{-1, -1}
		queue = append(queue, v)
	}
	distanceTo[startNode] = 0

	for len(queue) > 0 {
		u := minDistNode(distanceTo, queue)

		if u == endNode {
			break // break early, since we only need one path
		}

		// remove from queue
		for i, node := range queue {
			if node == u {
				queue[i] = queue[len(queue)-1]
				queue = queue[:len(queue)-1]
				break
			}
		}

		for _, edge := range g.GetNeighborEdges(u) {
			v := edge.To
			alt := distanceTo[u] + edge.Weight
			if alt < distanceTo[v] {
				distanceTo[v] = alt
				parentOf[v] = u
			}
		}
	}

	return g.buildPath(parentOf, endNode)
}

func minDistNode(distanceTo map[Node]int, queue []Node) Node {
	minNode := Node{-1, -1}
	minDist := math.MaxInt
	for u, dist := range distanceTo {
		if dist < minDist && slices.Contains(queue, u) {
			minNode = u
			minDist = dist
		}
	}
	return minNode
}

// build in reverse, since `parentOf` is reversed to begin with
func (g *Graph) buildPath(parentOf map[Node]Node, endNode Node) Path {

	path := Path{}
	u := endNode

	for {
		path.Nodes = append([]Node{u}, path.Nodes...)

		parent := parentOf[u]
		if parent == (Node{-1, -1}) {
			break
		}
		path.Cost += g.GetEdge(parent, u).Weight
		u = parent
	}

	return path
}
