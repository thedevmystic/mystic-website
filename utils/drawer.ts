/* Drawer utils */

import fs from 'fs/promises';
import path from 'path';

import type { SidebarDrawerItem } from '@/components/SidebarDrawer';

export async function getDrawerContent(slug: string[]): Promise<SidebarDrawerItem[]> {
  const baseDir = path.join(process.cwd(), 'content/docs');

  for (let i = slug.length; i >= 0; i--) {
    const currentPath = path.join(baseDir, ...slug.slice(0, i));
    const drawerFilePath = path.join(currentPath, 'drawer.json');

    try {
      const fileContent = await fs.readFile(drawerFilePath, 'utf-8');
      const drawerContent: SidebarDrawerItem[] = JSON.parse(fileContent);
      return drawerContent;
    } catch {
      // If the file doesn't exist, continue to the next iteration
      continue;
    }
  }

  return []; // Return an empty object if no drawer.json is found
}
