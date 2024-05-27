const DEFAULT_ERROR_MESSAGE =
  "エラーが発生しました。お手数をおかけしますが、時間を置いて、もう一度お試しください。"
export const INTERNAL_SERVER_ERROR_CODE = 500
export const NOT_FOUND_ERROR_CODE = 404

export class NotionApiError extends Error {
  constructor(error: unknown) {
    super(DEFAULT_ERROR_MESSAGE, { cause: error })
    console.error(error)
  }
}
