package internal

import (
	"math"
	"math/rand"
)

var matrix [][]float64
var graph []Node

type Node struct {
	x float64
	y float64
}

func GenerateMatrix(amountOfNodes int) [][]float64 {
	nodes := make([]Node, amountOfNodes)
	for i := 0; i < amountOfNodes; i++ {
		nodes[i].x = rand.Float64() * 100
		nodes[i].y = rand.Float64() * 100
	}
	graph = nodes

	matrix = make([][]float64, amountOfNodes)
	for i := range matrix {
		matrix[i] = make([]float64, amountOfNodes)
	}
	for i, node := range nodes {
		for j, target := range nodes {
			matrix[i][j] = distance(node, target)
		}
	}
	return matrix
}

func GetGraph() []Node {
	return graph
}

func GetMatrix() [][]float64 {
	return matrix
}

func distance(a Node, b Node) float64 {
	return math.Sqrt(math.Pow(a.x-b.x, 2) + math.Pow(a.y-b.y, 2))
}
