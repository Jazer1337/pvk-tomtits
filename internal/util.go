package internal

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

//
// --- No native type Set exists... ---
//

type Set map[int]struct{}

func (s *Set) Add(element int) {
	(*s)[element] = struct{}{}
}

func (s *Set) Remove(element int) {
	delete(*s, element)
}

func (s *Set) Contains(element int) bool {
	_, exists := (*s)[element]
	return exists
}

//
// --- Read map from json ---
//

func ReadJSON(fname string) [][2]int {

	file, err := os.Open(fname)
	if err != nil {
		fmt.Printf("Error opening \"%s\": %s\n", fname, err)
		return nil
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		fmt.Printf("Error reading \"%s\": %s\n", fname, err)
		return nil
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
		return nil
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

	return mapMatrixToNodes(matrix)
}

// extract conjunctions from `mapMatrix` (convert to array of nodes)
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
