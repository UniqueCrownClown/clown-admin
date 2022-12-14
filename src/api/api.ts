import { BaseApi } from '@/api/baseApi'
import { AxiosApi } from '@/api/axiosApi'
import type { IApi } from '@/types'

export class Api extends BaseApi implements IApi {
  private provider: any = new AxiosApi()
  async fetch(url: string): Promise<any> {
    return await this.provider.fetch(url)
  }
}