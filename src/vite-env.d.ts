/// <reference types="vite/client" />

// 为Vue扩展声明模块
declare module 'vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export { 
    ref, 
    computed, 
    watch, 
    onMounted, 
    onUnmounted, 
    watchEffect, 
    reactive, 
    defineComponent, 
    nextTick, 
    h,
    createApp 
  } from '@vue/runtime-dom'
  export default component
}

// 为Vue组件文件声明模块
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 为vue-router声明模块
declare module 'vue-router' {
  export * from 'vue-router/dist/vue-router'
  export { 
    useRouter, 
    useRoute, 
    createRouter, 
    createWebHashHistory,
    RouteRecordRaw
  } from 'vue-router/dist/vue-router'
}

// 为pinia定义模块
declare module 'pinia' {
  export * from 'pinia'
  export function defineStore<Id extends string, S extends object = {}, G extends object = {}, A = {}>(
    id: Id,
    options: {
      state?: () => S;
      getters?: G & ThisType<S & G>;
      actions?: A & ThisType<S & G & A>;
    }
  ): any;
  export function createPinia(): any;
}

// 为Electron声明模块
interface Window {
  electron: {
    send: (channel: string, data?: any) => void;
    receive: (channel: string, func: (...args: any[]) => void) => void;
    invoke: (channel: string, data?: any) => Promise<any>;
  };
}

declare module '@vue-flow/core' {
  import type { DefineComponent } from 'vue'
  
  export interface Node {
    id: string;
    type?: string;
    position: { x: number; y: number };
    data?: any;
    [key: string]: any;
  }
  
  export interface Edge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    [key: string]: any;
  }
  
  export interface Connection {
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
  }
  
  export interface XYPosition {
    x: number;
    y: number;
  }
  
  export enum MarkerType {
    Arrow = 'arrow',
    ArrowClosed = 'arrowclosed'
  }
  
  export const VueFlow: DefineComponent;
  export const Background: DefineComponent;
  export const MiniMap: DefineComponent;
  export const Controls: DefineComponent;
  export function useVueFlow(options?: any): any;
}

declare module '@vue-flow/background';
declare module '@vue-flow/minimap';
declare module '@vue-flow/controls';
