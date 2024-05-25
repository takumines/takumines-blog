import {
  APIResponseError,
  isNotionClientError,
  RequestTimeoutError,
  UnknownHTTPResponseError,
} from "@notionhq/client/build/src/errors"

const DEFAULT_ERROR_MESSAGE =
  "エラーが発生しました。お手数をおかけしますが、時間を置いて、もう一度お試しください。"
const INTERNAL_SERVER_ERROR = 500

export class NotionApiError extends Error {
  public message: string
  public statusCode: number

  constructor(error: unknown) {
    // 基底クラスErrorのコンストラクタを呼び出す
    super(DEFAULT_ERROR_MESSAGE, { cause: error })

    // エラーメッセージとステータスコードを初期化
    const { message, statusCode } = NotionApiError.resolveErrorDetails(error)

    // プロパティに初期値を設定
    this.statusCode = statusCode ?? INTERNAL_SERVER_ERROR
    this.message = message ?? DEFAULT_ERROR_MESSAGE

    console.error(error)
  }

  // NotionClientErrorのエラーオブジェクトを受け取り、エラーの詳細を取得
  private static resolveErrorDetails(error: unknown): {
    message?: string
    statusCode?: number
  } {
    if (
      RequestTimeoutError.isRequestTimeoutError(error) ||
      isNotionClientError(error)
    ) {
      return {
        message: DEFAULT_ERROR_MESSAGE,
        statusCode: INTERNAL_SERVER_ERROR,
      }
    }

    if (UnknownHTTPResponseError.isUnknownHTTPResponseError(error)) {
      return { message: error.message, statusCode: error.status }
    }

    if (APIResponseError.isAPIResponseError(error)) {
      return { message: error.message, statusCode: error.status }
    }

    return {}
  }
}
