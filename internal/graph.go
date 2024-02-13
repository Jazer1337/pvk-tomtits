package internal

import (
	"fmt"
	"strings"
)

type Graph struct {
	nodes [][]int // adjacency matrix implementation
}

func NewGraph(numNodes int) Graph {

	nodes := make([][]int, numNodes)

	for i := range nodes {
		nodes[i] = make([]int, numNodes)
	}

	return Graph{nodes}
}

func (g *Graph) addEdge(from int, to int, weight int) {
	g.nodes[from][to] = weight
	g.nodes[to][from] = weight
}

func (g *Graph) removeEdge(from int, to int) {
	g.nodes[from][to] = 0
	g.nodes[to][from] = 0
}

func (g *Graph) hasEdge(from int, to int) bool {
	return g.nodes[from][to] != 0
}

func (g *Graph) getWeight(from int, to int) int {
	return g.nodes[from][to]
}

// NOTE: `from` may be `to` as well, since the graph is undirected
func (g *Graph) getNeighbors(from int) []int {

	neighbors := []int{}

	for i := 0; i < len(g.nodes); i++ {
		if g.hasEdge(from, i) {
			neighbors = append(neighbors, i)
		}
	}

	return neighbors

}

func (g *Graph) getNonEmptyNodes() []int {

	nonEmpty := map[int]struct{}{} // represents a set

	for from := 0; from < len(g.nodes); from++ {
		for to := 0; to < len(g.nodes); to++ {
			if g.hasEdge(from, to) {

				_, exists := nonEmpty[to]

				if !exists {
					nonEmpty[to] = struct{}{}
				}
			}
		}
	}

	keys := make([]int, 0, len(nonEmpty))
	for k := range nonEmpty {
		keys = append(keys, k)
	}

	return keys
}

func (g Graph) String() string {

	str := ""

	for from := 0; from < len(g.nodes); from++ {
		str += fmt.Sprintf("%d: ", from)

		for to := 0; to < len(g.nodes); to++ {
			if g.hasEdge(from, to) {
				str += fmt.Sprintf("(%d, %d), ", to, g.getWeight(from, to))
			}
		}

		str = strings.TrimSuffix(str, ", ") + "\n"
	}

	str = strings.TrimSuffix(str, "\n")

	return str
}
