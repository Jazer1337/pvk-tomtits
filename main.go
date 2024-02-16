package main

import (
	"fmt"
	tsp "pvk-tomtits/internal"
)

func main() {

	// example

	g := tsp.NewGraph()

	m := []int{
		0, 1, 50,
		0, 2, 600,
		0, 3, 3,
		0, 4, 500,
		1, 2, 5,
		1, 3, 150,
		1, 4, 7,
		2, 3, 8,
		2, 4, 9,
		3, 4, 10,
		2, 5, 100,
		2, 6, 300,
		5, 6, 200,
	}

	// add forward and backward edges
	for i := 0; i < len(m); i += 3 {
		g.AddEdge(m[i], m[i+1], m[i+2])
		g.AddEdge(m[i+1], m[i], m[i+2])
	}

	path := g.FindShortestPathAll([]int{0, 4, 3, 1})

	fmt.Printf("path: %v\n", path)

}
