package internal

import (
	"math"
	"math/rand"
)

type Node struct {
	x int
	y int
}

var nodes []Node
var matrix Graph

func GenerateMatrix(amountOfNodes int) Graph {
	nodes := make([]Node, amountOfNodes)
	for i := 0; i < amountOfNodes; i++ {
		nodes[i].x = rand.Intn(1000)
		nodes[i].y = rand.Intn(1000)
	}

	var graph Graph

	for i, node := range nodes {
		for j, target := range nodes {
			graph.AddEdge(i, j, int(distance(node, target)))
		}
	}

	return graph
}

func GetNodes() []Node {
	return nodes
}

func GetMatrix() Graph {
	return matrix
}

func distance(a Node, b Node) float64 {
	return math.Sqrt(float64(a.x - b.x*a.x - b.x + a.y - b.y*a.y - b.y))
}
