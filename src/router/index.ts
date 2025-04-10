import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/workflow',
    name: 'Workflow',
    component: () => import('../views/WorkflowListView.vue')
  },
  {
    path: '/workflow/editor/:id',
    name: 'WorkflowEditor',
    component: () => import('../views/WorkflowEditorView.vue')
  },
  {
    path: '/workflow/templates',
    name: 'WorkflowTemplates',
    component: () => import('../views/WorkflowTemplatesView.vue')
  },
  {
    path: '/workflow/components',
    name: 'WorkflowComponents',
    component: () => import('../views/WorkflowComponentsView.vue')
  },
  {
    path: '/workflow/chat/:id',
    name: 'ChatWorkflow',
    component: () => import('../views/ChatWorkflowView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 