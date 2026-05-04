import { MCPAccessSettings } from '@payloadcms/plugin-mcp'

export const LOCAL_DEV_MCP_USER: MCPAccessSettings['user'] = {
  id: 0,
  collection: 'users',
  email: 'local-mcp@localhost',
  name: 'Local MCP',
  role: 'admin',
  updatedAt: new Date(0).toISOString(),
  createdAt: new Date(0).toISOString(),
}

export const LOCAL_HOSTS = ['127.0.0.1', '::1', 'localhost']
