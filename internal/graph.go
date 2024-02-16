package internal

import (
	"fmt"
	"sort"
	"strings"
)

type Graph struct {
	nodes map[int][]EdgeTo // neighbor list, to save space

	// example: {3: {{7,5},{9,12}}, 7: {{3,5}}, 9: {{3,12}}}
	// (unless backwards edge is also added)
}

// NOTE: directed edge
type EdgeTo struct {
	to     int
	weight int
}

func NewGraph() Graph {
	return Graph{make(map[int][]EdgeTo)}
}

func (g *Graph) AddEdge(from, to, weight int) {

	e := EdgeTo{to, weight}

	if g.GetEdge(from, to) != nil {
		return
	}
	g.nodes[from] = append(g.nodes[from], e)
}

func (g *Graph) RemoveEdge(from, to int) {

	for i, edge := range g.GetNeighborEdges(from) {
		if edge.to == to {
			g.nodes[from] = append(g.nodes[from][:i], g.nodes[from][i+1:]...)
			break
		}
	}
}

// returns pointer, not copy
func (g *Graph) GetEdge(from, to int) *EdgeTo {

	for _, edge := range g.nodes[from] {
		if edge.to == to {
			return &edge
		}
	}
	return nil
}

func (g *Graph) GetNeighborEdges(node int) []EdgeTo {
	return g.nodes[node]
}

func (g *Graph) GetNodes() []int {

	nodes := Set{}

	for node, edges := range g.nodes {
		nodes.Add(node)

		for _, edge := range edges {
			nodes.Add(edge.to)
		}
	}

	// convert to []int to prevent confusion when looping with "range"
	slice := []int{}

	for node := range nodes {
		slice = append(slice, node)
	}
	return slice
}

func (g Graph) String() string {

	str := ""

	nodes := g.GetNodes()
	sort.Ints(nodes)

	for _, node := range nodes {
		str += fmt.Sprintf("%v: %v\n", node, g.GetNeighborEdges(node))
	}
	str = strings.TrimSuffix(str, "\n")

	return str
}
