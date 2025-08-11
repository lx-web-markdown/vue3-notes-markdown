/**
 * 文件树节点类型定义
 */
export interface Tree {
  name: string;
  type: string;
  level: number;
  fullPath: string;
  children?: Tree[];
}

/**
 * 文件类型映射
 */
export interface FilePathMapping {
  [key: string]: string;
} 