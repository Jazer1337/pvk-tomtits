package internal

import "math/rand"

type Solution struct {
	cost  int
	cycle []int
}

// NOTE: assumes complete graph
func solveRandom(graph *Graph, startNode int) Solution {

	nodesLeft := graph.getNonEmptyNodes()

	// randomize array
	for i := range nodesLeft {
		j := rand.Intn(i + 1)
		nodesLeft[i], nodesLeft[j] = nodesLeft[j], nodesLeft[i]
	}

	// place startNode at index 0
	for i, node := range nodesLeft {
		if node == startNode {
			nodesLeft[i], nodesLeft[0] = nodesLeft[0], nodesLeft[i]
			break
		}
	}

	nodesLeft = append(nodesLeft, startNode)

	sol := Solution{cycle: nodesLeft}

	// add cost
	for i := 1; i < len(nodesLeft); i++ {
		from, to := nodesLeft[i-1], nodesLeft[i]
		sol.cost += graph.getWeight(from, to)
	}

	return sol
}
