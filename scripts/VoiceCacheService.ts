import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

type VoiceCache = Record<string, string>

function isVoiceCache(value: unknown): value is VoiceCache {
  return typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && Object.values(value).every((hash) => typeof hash === 'string')
}

export class VoiceCacheService {
  private readonly cachePath: string
  private cache: VoiceCache = {}

  constructor(cachePath = path.resolve('scripts', 'voice-cache.json')) {
    this.cachePath = cachePath
  }

  async load(): Promise<void> {
    try {
      const content = await readFile(this.cachePath, 'utf8')
      const parsed: unknown = JSON.parse(content)

      if (!isVoiceCache(parsed)) {
        throw new Error('Voice cache must be an object of SHA-256 hashes')
      }

      this.cache = parsed
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        this.cache = {}
        return
      }

      throw error
    }
  }

  async save(): Promise<void> {
    await mkdir(path.dirname(this.cachePath), { recursive: true })
    await writeFile(this.cachePath, `${JSON.stringify(this.cache, null, 2)}\n`, 'utf8')
  }

  readHash(id: number): string | undefined {
    return this.cache[String(id)]
  }

  writeHash(id: number, hash: string): void {
    this.cache[String(id)] = hash
  }

  deleteHash(id: number): void {
    delete this.cache[String(id)]
  }
}
