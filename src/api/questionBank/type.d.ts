/**
 * 审核状态枚举（对应 adult_status 字段）
 */
export enum AdultStatus {
  /** 待审核 */
  PENDING = 0,
  /** 审核成功 */
  SUCCESS = 1,
  /** 审核失败 */
  FAIL = 2,
}

export interface QuestionBank {
  /** 主键 ID */
  id: number;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 图片 URL（可选） */
  picture?: string;
  /** 创建的用户 ID */
  user_id: number;
  user: {
    username: string;
  };
  questionList?: Question[];
  /** 审核状态（0 待审核 1 审核成功 2 审核失败） */
  adult_status: AdultStatus;
  /** 排序优先级 */
  priority: number;
  /** 创建时间（ISO 格式字符串） */
  created_at: string;
  /** 更新时间（ISO 格式字符串） */
  updated_at: string;
}

export interface QuestionBankAdultLog {
  id: number;
  remark: string;
  created_at: string;
  user: {
    username: string;
  };
}
