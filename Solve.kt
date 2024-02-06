
class Solve {

    class Solution(val graph: Graph) {
        // `graph` is only used when getting weight of edges

        val nodesLeft = graph.getNonEmptyNodes()

        var cost = 0
        val cycle = mutableListOf<Int>()

        override fun toString(): String {
            return "Solution(cost=$cost, cycle=$cycle)"
        }

        fun walkTo(node: Int) {
            // TODO: prevent visiting same node twice etc

            nodesLeft.remove(node)
            cycle.add(node)

            cost += graph.getWeight(cycle.last(), node)
        }
    }

    // TODO: fill with more solvers
    companion object {

        fun random(graph: Graph): Solution {
        
            val sol = Solution(graph)

            while (sol.nodesLeft.isNotEmpty()) {
                sol.walkTo(sol.nodesLeft.random())
            }
        
            sol.walkTo(sol.cycle.first())

            return sol
        }
    }
}
