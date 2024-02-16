package internal

import (
	"math"
	"slices"
)

type Path struct {
	Cost  int
	Nodes []int
}

// Include all nodes in `nodes` when finding path.
// First node is start node, last is end node.
func (g *Graph) FindShortestPathAll(nodes []int) Path {

	pathCombined := Path{Nodes: []int{nodes[0]}}

	from := nodes[0]

	// don't loop through start node
	for _, node := range nodes[1:] {

		// unnecessary to visit node again if already visited
		if slices.Contains(pathCombined.Nodes, node) {
			continue
		}

		path := g.FindShortestPathBetween(from, node)
		from = node

		// don't append first node (was appended last iteration)
		pathCombined.Nodes = append(pathCombined.Nodes, path.Nodes[1:]...)
		pathCombined.Cost += path.Cost

		g.ApplyPath(path)
	}

	return pathCombined
}

// Dijkstra's algorithm: find shortest path between nodes in weighted, directed graph.
// (pseudo code at: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
func (g *Graph) FindShortestPathBetween(startNode, endNode int) Path {

	distanceTo := map[int]int{}
	parentOf := map[int]int{}
	queue := Set{}

	for _, v := range g.GetNodes() {
		distanceTo[v] = math.MaxInt
		parentOf[v] = -1
		queue.Add(v)
	}
	distanceTo[startNode] = 0

	for len(queue) > 0 {
		u := minDistNode(distanceTo, queue)
		queue.Remove(u)

		for _, edge := range g.GetNeighborEdges(u) {
			v := edge.to
			alt := distanceTo[u] + edge.weight
			if alt < distanceTo[v] {
				distanceTo[v] = alt
				parentOf[v] = u
			}
		}
	}

	return g.buildPath(parentOf, endNode)
}

func minDistNode(distanceTo map[int]int, queue Set) int {
	minNode := -1
	minDist := math.MaxInt
	for u, dist := range distanceTo {
		if dist < minDist && queue.Contains(u) {
			minNode = u
			minDist = dist
		}
	}
	return minNode
}

// build in reverse, since `parentOf` is reversed to begin with
func (g *Graph) buildPath(parentOf map[int]int, endNode int) Path {

	path := Path{}
	u := endNode

	for {
		path.Nodes = append([]int{u}, path.Nodes...)

		parent := parentOf[u]
		if parent == -1 {
			break
		}
		path.Cost += g.GetEdge(parent, u).weight
		u = parent
	}

	return path
}

// Remove edges to prevent walking on them again.
// Also removes potential backwards edges.
// `path`: array of nodes
func (g *Graph) ApplyPath(path Path) {
	for i := 0; i < len(path.Nodes)-1; i++ {
		g.RemoveEdge(path.Nodes[i], path.Nodes[i+1])
		g.RemoveEdge(path.Nodes[i+1], path.Nodes[i])
	}
}
