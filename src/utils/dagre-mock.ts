// Dagre模拟实现，用于在无法安装真实依赖的情况下

interface GraphNode {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

interface Graph {
  nodes: Map<string, GraphNode>;
  edges: Array<{source: string; target: string}>;
  options: any;
}

export default {
  graphlib: {
    Graph: class {
      nodes: Map<string, GraphNode> = new Map();
      edges: Array<{source: string; target: string}> = [];
      options: any = {};

      setNode(id: string, attributes: GraphNode) {
        this.nodes.set(id, {
          ...attributes,
          x: 0,
          y: 0
        });
      }

      setEdge(source: string, target: string) {
        this.edges.push({source, target});
      }

      setGraph(options: any) {
        this.options = options;
      }

      setDefaultEdgeLabel(callback: Function) {
        // 仅占位
      }

      node(id: string) {
        return this.nodes.get(id) || {x: 0, y: 0, width: 0, height: 0};
      }
    }
  },

  layout: (graph: any) => {
    // 简单的垂直布局算法
    const nodes = Array.from(graph.nodes.keys()) as string[];
    const verticalSpacing = 150;
    const horizontalSpacing = 50;
    
    let y = 100;
    let maxWidth = 0;
    let x = 250;
    
    // 第一步：找到根节点（没有入边的节点）
    const incomingEdges = new Map<string, number>();
    
    for (const edge of graph.edges) {
      const count = incomingEdges.get(edge.target) || 0;
      incomingEdges.set(edge.target, count + 1);
    }
    
    // 找到没有入边的节点作为起点
    const rootNodes = nodes.filter(node => !incomingEdges.has(node as string));
    
    // 第二步：用简单BFS计算每个节点的位置
    if (rootNodes.length > 0) {
      const processed = new Set<string>();
      const queue = [...rootNodes];
      const levels = new Map<string, number>();
      
      rootNodes.forEach(node => levels.set(node as string, 0));
      
      while (queue.length > 0) {
        const current = queue.shift()! as string;
        if (processed.has(current)) continue;
        
        processed.add(current);
        const level = levels.get(current) || 0;
        
        // 设置当前节点的位置
        const node = graph.nodes.get(current);
        if (node) {
          node.x = x + (level * horizontalSpacing);
          node.y = y;
          y += verticalSpacing;
          maxWidth = Math.max(maxWidth, node.width || 0);
        }
        
        // 找到所有以当前节点为起点的边
        const outEdges = graph.edges.filter(e => e.source === current);
        for (const edge of outEdges) {
          const nextLevel = level + 1;
          const existingLevel = levels.get(edge.target) || 0;
          
          if (nextLevel > existingLevel) {
            levels.set(edge.target, nextLevel);
          }
          
          if (!processed.has(edge.target)) {
            queue.push(edge.target);
          }
        }
      }
    }
  }
}; 