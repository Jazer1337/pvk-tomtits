package internal

import (
	"fmt"
	"math"
)

func FindShortestPath(startingNode int, targetNode int, adjacencyMatrix [][]int) int {
	distanceTo := make([]int, len(adjacencyMatrix))

	for i := range distanceTo {
		distanceTo[i] = -1
	}

	distanceTo[startingNode] = 0
	distanceTo[targetNode] = math.MaxInt

	prevDistanceTo := make([]int, len(distanceTo))
	copy(prevDistanceTo, distanceTo)

	for true {
		fmt.Println(distanceTo)
		for i, distance := range distanceTo {
			if distance < distanceTo[targetNode] && distance >= 0 {
				for potentialNeighbor, edgeLength := range adjacencyMatrix[i] {
					if distanceTo[potentialNeighbor] == -1 {
						distanceTo[potentialNeighbor] = edgeLength + distanceTo[i]
					} else if edgeLength != 0 {
						distanceTo[potentialNeighbor] = min(distanceTo[potentialNeighbor], edgeLength+distanceTo[i])

					}
				}

			}
		}

		if isEqual(prevDistanceTo, distanceTo) {
			break
		}
		copy(prevDistanceTo, distanceTo)
	}

	return distanceTo[targetNode]
}

func minElement(slice []int) int {
	min := slice[0]
	for i := 1; i < len(slice); i++ {
		if min > slice[i] {
			min = slice[i]
		}
	}
	return min
}

func isEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}

	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}

	return true
}
