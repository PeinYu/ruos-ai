import { h, ref } from 'vue';

// 模拟Vue Flow组件
// 仅用于开发阶段，在无法安装真实依赖的情况下

export interface NodeProps {
  id: string;
  data: any;
  selected?: boolean;
}

export const VueFlow = {
  name: 'VueFlow',
  render(this: { $slots?: { default?: () => any[] } }) {
    return h('div', { class: 'vue-flow' }, this.$slots?.default ? this.$slots.default() : []);
  }
};

export const Background = {
  name: 'Background',
  render() {
    return h('div', { class: 'vue-flow__background' });
  }
};

export const Controls = {
  name: 'Controls',
  render() {
    return h('div', { class: 'vue-flow__controls' });
  }
};

export const MiniMap = {
  name: 'MiniMap',
  render() {
    return h('div', { class: 'vue-flow__minimap' });
  }
};

// 模拟useVueFlow hook
export const useVueFlow = (options: any = {}) => {
  return {
    onConnect: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    fitView: () => {},
    canUndo: ref(false),
    canRedo: ref(false),
    undo: () => {},
    redo: () => {}
  };
};

export const NodeTypes = {};
export const Edge = {};
export const Connection = {};
export const Node = {};
export const MarkerType = {
  Arrow: 'arrow',
  ArrowClosed: 'arrowclosed'
}; 