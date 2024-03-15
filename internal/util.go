package internal

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"math/rand"
	"os"
)

//
// --- Read map from json ---
//

func JSONToGraph(fname string) (graph Graph) {

	file, err := os.Open(fname)
	if err != nil {
		fmt.Printf("Error opening \"%s\": %s\n", fname, err)
		return
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		fmt.Printf("Error reading \"%s\": %s\n", fname, err)
		return
	}

	type Tile struct {
		ID string `json:"id"`
		X  int    `json:"x"`
		Y  int    `json:"y"`
	}

	type Layer struct {
		Name  string `json:"name"`
		Tiles []Tile `json:"tiles"`
	}

	type MapData struct {
		TileSize  int     `json:"tileSize"`
		MapWidth  int     `json:"mapWidth"`
		MapHeight int     `json:"mapHeight"`
		Layers    []Layer `json:"layers"`
	}

	var mapData MapData

	err = json.Unmarshal(content, &mapData)

	if err != nil {
		fmt.Printf("Error decoding json file \"%s\": %s\n", fname, err)
		return
	}

	// create matrix where 1 means road, 0 means not road
	matrix := make([][]int, mapData.MapHeight)

	for i := range mapData.MapHeight {
		matrix[i] = make([]int, mapData.MapWidth)
	}

	for _, layer := range mapData.Layers {
		if layer.Name == "Roads" {
			for _, tile := range layer.Tiles {
				matrix[tile.Y][tile.X] = 1
			}
			break
		}
	}

	return nodesToGraph(mapMatrixToNodes(matrix))
}

// extract conjunctions from `mapMatrix` (convert to graph)
func mapMatrixToNodes(mapMatrix [][]int) [][2]int {

	h := len(mapMatrix)
	w := len(mapMatrix[0])

	var nodes [][2]int

	for y := range h {
		for x := range w {

			if mapMatrix[y][x] == 0 {
				continue
			}

			hasXNeighbor := false
			hasYNeighbor := false

			if x == 0 {
				hasXNeighbor = mapMatrix[y][x+1] == 1
			} else if x == w-1 {
				hasXNeighbor = mapMatrix[y][x-1] == 1
			} else {
				hasXNeighbor = (mapMatrix[y][x+1] == 1 || mapMatrix[y][x-1] == 1)
			}

			if y == 0 {
				hasYNeighbor = mapMatrix[y+1][x] == 1
			} else if y == h-1 {
				hasYNeighbor = mapMatrix[y-1][x] == 1
			} else {
				hasYNeighbor = (mapMatrix[y-1][x] == 1 || mapMatrix[y+1][x] == 1)
			}

			if hasXNeighbor && hasYNeighbor {
				nodes = append(nodes, [2]int{x, y})
			}
		}
	}

	return nodes
}

func nodesToGraph(nodes [][2]int) Graph {

	graph := NewGraph()

	for i := range nodes {
		closestX := -1
		closestY := -1

		x := nodes[i][0]
		y := nodes[i][1]

		for j := i + 1; j < len(nodes); j++ {
			if nodes[j][1] == y {
				if closestX == -1 || nodes[j][0] < closestX {
					closestX = nodes[j][0]
				}
			} else if nodes[j][0] == x {
				if closestY == -1 || nodes[j][1] < closestY {
					closestY = nodes[j][1]
				}
			}
		}

		node1 := Node{nodes[i][0], nodes[i][1]}

		if closestY != -1 {
			node2 := Node{node1.X, closestY}
			graph.AddEdge(node1, node2, 5)
		}

		if closestX != -1 {
			node2 := Node{closestX, node1.Y}
			graph.AddEdge(node1, node2, 5)
		}
	}

	return graph
}

func GenerateCompleteGraph(numNodes, maxX, maxY int) Graph {
	nodes := make([]Node, numNodes)
	for i := 0; i < numNodes; i++ {
		nodes[i].X = rand.Intn(maxX + 1)
		nodes[i].Y = rand.Intn(maxY + 1)
	}

	graph := NewGraph()

	for i := range nodes {
		for j := i + 1; j < len(nodes); j++ {
			dx := nodes[j].X - nodes[i].X
			dy := nodes[j].Y - nodes[i].Y
			dist := math.Sqrt(float64(dx*dx + dy*dy))

			graph.AddEdge(nodes[i], nodes[j], int(dist))
		}
	}

	return graph
}
