package tsp

import (
	"math"
	"math/rand"
)

var graph [][]float64

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

	matrix := make([][]float64, amountOfNodes)
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

func distance(a Node, b Node) float64 {
	return math.Sqrt(math.Pow(a.x-b.x, 2) + math.Pow(a.y-b.y, 2))
}
