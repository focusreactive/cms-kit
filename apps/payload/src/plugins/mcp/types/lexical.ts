export interface LexicalNode {
  type?: string
  tag?: string
  text?: string
  format?: number
  url?: string
  listType?: string
  children?: LexicalNode[]
}
