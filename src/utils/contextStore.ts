import fs from 'fs';
import path from 'path';

export class ContextStore {
  private static context: Map<string, unknown> = new Map();

  static put(key: string, value: unknown): void {
    if (key == null || value == null) {
      console.error('Error: Key or Value cannot be null.');
      return;
    }
    ContextStore.context.set(key, value);
  }

  static get<T>(key: string): T {
    if (!ContextStore.context.has(key)) {
      throw new Error(`Key '${key}' not found in ContextStore.`);
    }
    return ContextStore.context.get(key) as T;
  }

  static has(key: string): boolean {
  return ContextStore.context.has(key);
  }

  static remove(key: string): void {
    ContextStore.context.delete(key);
  }

  static keys(): string[] {
    return Array.from(ContextStore.context.keys());
  }

  static clear(): void {
    ContextStore.context.clear();
  }

  static loadProperties(filePath: string): void {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`Properties file not found at path: ${absolutePath}`);
      return;
    }

    const rawData = fs.readFileSync(absolutePath, 'utf-8');
    const lines = rawData.split(/\r?\n/);

    lines.forEach((line) => {
      if (line.trim() === '' || line.startsWith('#')) return;

      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      ContextStore.put(key.trim(), value);
    });
  }
}
