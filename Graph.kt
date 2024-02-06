
class Graph(private val numNodes: Int) {

    // adjacency matrix implementation of graph
    private val nodes = Array(numNodes) { Array(numNodes) { 0 } }

    private val nonEmptyNodes = mutableSetOf<Int>()

    fun addEdge(from: Int, to: Int, weight: Int) {
        // TODO: a) throw errors or b) ignore loops and weights <= 0?
        nodes[from][to] = weight
        nodes[to][from] = weight

        nonEmptyNodes.add(from)     // only adds if not present since Set
        nonEmptyNodes.add(to)
    }

    fun removeEdge(from: Int, to: Int) {
        nodes[from][to] = 0
        nodes[to][from] = 0

        nonEmptyNodes.remove(from)
        nonEmptyNodes.remove(to)
    }

    fun hasEdge(from: Int, to: Int): Boolean {
        return nodes[from][to] != 0
    }

    fun getWeight(from: Int, to: Int): Int {
        return nodes[from][to]
    }

    // NOTE: `from` may be `to` as well, since the graph is undirected
    fun getNeighbors(from: Int): List<Int> {
        val neighbors = mutableListOf<Int>()

        for (to in 0 until numNodes) {
            if (hasEdge(from, to)) {
                neighbors.add(to)
            }
        }
        return neighbors
    }

    override fun toString(): String {
        val sb = StringBuilder()

        for (from in 0 until numNodes) {
            sb.append("$from: ")

            for (to in 0 until numNodes) {
                if (hasEdge(from, to)) {
                    sb.append("($to, ${getWeight(from, to)}), ")
                }
            }

            if (sb.endsWith(", ")) {
                sb.delete(sb.length - 2, sb.length)
            }

            sb.append("\n")
        }

        if (sb.isNotEmpty()) {
            sb.deleteCharAt(sb.length - 1)
        }

        return sb.toString()
    }

    fun getNonEmptyNodes(): MutableSet<Int> {
        return nonEmptyNodes.toMutableSet()
    }

}
