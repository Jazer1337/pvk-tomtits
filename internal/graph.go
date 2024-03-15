package internal

import (
	"fmt"
	"sort"
	"strings"
)

type Graph struct {
	nodes map[Node][]Edge // neighbor list, to save space and quickly find neighbors
}

type Node struct {
	x int
	y int
}

func (n Node) String() string {
	return fmt.Sprintf("Node{%v,%v}", n.x, n.y)
}

type Edge struct {
	node1  Node
	node2  Node
	weight int
}

func NewGraph() Graph {
	return Graph{make(map[Node][]Edge)}
}

func (g *Graph) AddEdge(node1, node2 Node, weight int) {

	e := Edge{node1, node2, weight}

	if g.GetEdge(node1, node2) != nil {
		return // edge already exists
	}
	g.nodes[node1] = append(g.nodes[node1], e)
	g.nodes[node2] = append(g.nodes[node2], e)

}

func (g *Graph) RemoveEdge(node1, node2 Node) {

	for i, edge := range g.GetNeighborEdges(node1) {
		if edge.node2 == node2 {
			g.nodes[node1] = append(g.nodes[node1][:i], g.nodes[node1][i+1:]...)
			break
		}
	}

	for i, edge := range g.GetNeighborEdges(node2) {
		if edge.node1 == node1 {
			g.nodes[node2] = append(g.nodes[node2][:i], g.nodes[node2][i+1:]...)
			break
		}
	}
}

// returns pointer, not copy
func (g *Graph) GetEdge(node1, node2 Node) *Edge {

	for _, edge := range g.nodes[node1] {
		if edge.node2 == node2 {
			return &edge
		}
	}
	return nil
}

func (g *Graph) GetNeighborEdges(node Node) []Edge {
	return g.nodes[node]
}

func (g *Graph) GetNodes() []Node {

	nodesOnly := make([]Node, len(g.nodes))
	i := 0
	for node := range g.nodes {
		nodesOnly[i] = node
		i++
	}

	return nodesOnly
}

func (g Graph) String() string {

	str := ""

	nodes := g.GetNodes()

	sort.Slice(nodes, func(i, j int) bool {
		if nodes[i].x != nodes[j].x {
			return nodes[i].x < nodes[j].x
		}
		return nodes[i].y < nodes[j].y
	})

	for _, node := range nodes {
		str += fmt.Sprintf("%v: ", node)

		for _, edge := range g.GetNeighborEdges(node) {
			if edge.node1 == node {
				str += fmt.Sprintf("Edge{%v,w=%v}, ", edge.node2, edge.weight)
			} else {
				str += fmt.Sprintf("Edge{%v,w=%v}, ", edge.node1, edge.weight)
			}
		}
		str += "\n"
	}
	str = strings.TrimSuffix(str, "\n")

	return str
}
