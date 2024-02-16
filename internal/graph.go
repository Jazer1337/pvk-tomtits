package internal

import (
	"fmt"
	"sort"
	"strings"
)

type Graph struct {
	nodes map[int][]Edge // neighbor list, to save space

	// example: {3: {{7,5},{9,12}}, 7: {{3,5}}, 9: {{3,12}}}
}

type Edge struct {
	from   int
	to     int
	weight int
}

func NewGraph() Graph {
	return Graph{make(map[int][]Edge)}
}

func (g *Graph) AddEdge(from, to, weight int) {

	e := Edge{from, to, weight}

	if g.GetEdge(e.from, e.to) != nil {
		return // already exists, hence also in g.nodes[e.to]
	}

	g.nodes[e.from] = append(g.nodes[e.from], e)
	g.nodes[e.to] = append(g.nodes[e.to], e)
}

func (g *Graph) RemoveEdge(e Edge) {

	for i, edge := range g.nodes[e.from] {
		if edge.to == e.to {
			g.nodes[e.from] = append(g.nodes[e.from][:i], g.nodes[e.from][i+1:]...)
			break
		}
	}

	for i, edge := range g.nodes[e.to] {
		if edge.from == e.from {
			g.nodes[e.to] = append(g.nodes[e.to][:i], g.nodes[e.to][i+1:]...)
			break
		}
	}
}

// returns pointer, not copy
func (g *Graph) GetEdge(from, to int) *Edge {

	for _, edge := range g.nodes[from] {
		if edge.to == to {
			return &edge
		}
	}
	return nil
}

func (g *Graph) getNeighbors(from int) []Edge {
	return g.nodes[from]
}

func (g *Graph) getEdges() []Edge {

	nonEmpty := map[Edge]struct{}{} // represents a set

	for from := 0; from < len(g.nodes); from++ {
		for _, edge := range g.nodes[from] {
			nonEmpty[edge] = struct{}{}
		}
	}

	keys := make([]Edge, 0, len(nonEmpty))
	for k := range nonEmpty {
		keys = append(keys, k)
	}

	return keys
}

func (g *Graph) getNonEmptyNodes() []int {

	nonEmptyNodes := map[int]struct{}{}

	for _, edge := range g.getEdges() {
		nonEmptyNodes[edge.from] = struct{}{}
	}

	keys := make([]int, 0, len(nonEmptyNodes))
	for k := range nonEmptyNodes {
		keys = append(keys, k)
	}

	return keys

}

func (g Graph) String() string {

	edges := g.getEdges()

	// sort based on `from`, then based on `to`
	less := func(i, j int) bool {
		if edges[i].from != edges[j].from {
			return edges[i].from < edges[j].from
		}
		return edges[i].to < edges[j].to
	}

	sort.Slice(edges, less)

	str := ""

	for _, edge := range edges {
		str += fmt.Sprintf("%2d - %2d: weighs %v\n", edge.from, edge.to, edge.weight)
	}

	str = strings.TrimSuffix(str, "\n")

	return str
}

func (g *Graph) GenerateSubgraph(nodes []int) Graph {
	subGraph := NewGraph()

	// TEMP: convert neighbor list implementation to adjacency matrix

	numNodes := len(g.getNonEmptyNodes())

	matrix := make([][]int, numNodes)

	for i := range numNodes {
		matrix[i] = make([]int, numNodes)
	}

	for _, neighbors := range g.nodes {
		for _, edge := range neighbors {
			if edge.from < numNodes && edge.to < numNodes {

				fmt.Println(edge)
				matrix[edge.from][edge.to] = edge.weight
				matrix[edge.to][edge.from] = edge.weight
			}
		}
	}

	// TODO: broken with introduction of edges
	for i := range nodes {
		for j := i + 1; j < len(nodes); j++ {
			subGraph.AddEdge(i, j, FindShortestPath(i, j, matrix))
		}
	}
	return subGraph
}
