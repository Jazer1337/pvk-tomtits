package main

import (
	"fmt"
	tsp "pvk-tomtits/internal"
)

func main() {

	// --- example: solving ---
	graph := tsp.NewGraph()

	edges := [][5]int{
		{9, 2, 11, 2, 3},
		{11, 2, 16, 2, 1},
		{16, 2, 18, 2, 2},
		{18, 2, 21, 2, 100},
		{18, 2, 18, 8, 5},
		{21, 2, 21, 8, 2},
		{21, 8, 18, 8, 3},
		{18, 8, 18, 10, 7},
		{18, 10, 12, 10, 300},
		{12, 10, 9, 10, 1},
		{9, 10, 9, 6, 2},
		{9, 6, 9, 2, 3},
	}

	for _, edge := range edges {
		graph.AddEdge(tsp.Node{edge[0], edge[1]}, tsp.Node{edge[2], edge[3]}, edge[4])
	}

	startNode := tsp.Node{16, 2}
	nodes := []tsp.Node{{21, 2}, {21, 8}, {12, 10}}
	path := graph.FindShortestPathAll(startNode, nodes)

	fmt.Println("path:", path)

	// // --- example: load JSON ---
	// g1 := tsp.JSONToGraph("internal/mapExample.json")
	// fmt.Println("graph from json:")
	// fmt.Println(g1)

	// // --- example: generate complete graph ---
	// g2 := tsp.GenerateCompleteGraph(5, 50, 3)
	// fmt.Println("\ncomplete graph:")
	// fmt.Println(g2)

}
