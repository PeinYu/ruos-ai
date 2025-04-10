declare module '@vue-flow/core' {
  export interface Node {
    id: string;
    type?: string;
    position: { x: number; y: number };
    data: any;
    [key: string]: any;
  }

  export interface Edge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    [key: string]: any;
  }

  export interface Connection {
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }

  export interface XYPosition {
    x: number;
    y: number;
  }

  export enum MarkerType {
    Arrow = 'arrow',
    ArrowClosed = 'arrowclosed',
  }

  export interface NodeTypes {
    [key: string]: any;
  }

  export const VueFlow: any;
  export const Background: any;
  export const MiniMap: any;
  export const Controls: any;
  export const useVueFlow: any;
}

declare module '@vue-flow/background' {}
declare module '@vue-flow/controls' {}
declare module '@vue-flow/minimap' {} 