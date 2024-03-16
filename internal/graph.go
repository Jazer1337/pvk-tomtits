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
	X int
	Y int
}

func (n Node) String() string {
	return fmt.Sprintf("Node{%v,%v}", n.X, n.Y)
}

type Edge struct {
	To     Node
	Weight int
}

func NewGraph() Graph {
	return Graph{make(map[Node][]Edge)}
}

func (g *Graph) AddEdge(node1, node2 Node, weight int) {

	e1 := Edge{node2, weight}

	if g.GetEdge(node1, node2) != nil {
		return // edge already exists
	}
	g.nodes[node1] = append(g.nodes[node1], e1)
	g.nodes[node2] = append(g.nodes[node2], Edge{node1, weight}) // create reverse edge but with same weight

}

func (g *Graph) RemoveEdge(node1, node2 Node) {

	for i, edge := range g.GetNeighborEdges(node1) {
		if edge.To == node2 {
			g.nodes[node1] = append(g.nodes[node1][:i], g.nodes[node1][i+1:]...)
			break
		}
	}

	for i, edge := range g.GetNeighborEdges(node2) {
		if edge.To == node1 {
			g.nodes[node2] = append(g.nodes[node2][:i], g.nodes[node2][i+1:]...)
			break
		}
	}
}

// returns pointer, not copy
func (g *Graph) GetEdge(node1, node2 Node) *Edge {

	for _, edge := range g.nodes[node1] {
		if edge.To == node2 {
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

func (g *Graph) GetNumNodes() int {
	return len(g.nodes)
}

func (g Graph) String() string {

	str := ""

	nodes := g.GetNodes()

	sort.Slice(nodes, func(i, j int) bool {
		if nodes[i].X != nodes[j].X {
			return nodes[i].X < nodes[j].X
		}
		return nodes[i].Y < nodes[j].Y
	})

	for _, node := range nodes {
		str += fmt.Sprintf("%v: ", node)

		for _, edge := range g.GetNeighborEdges(node) {
			str += fmt.Sprintf("Edge{%v,w=%v}, ", edge.To, edge.Weight)
		}
		str += "\n"
	}
	str = strings.TrimSuffix(str, "\n")

	return str
}
