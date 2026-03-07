type DifficultyLevel = 1 | 2 | 3; // 难度值 1 简单 2 中等 3 困难
type AuditStatus = 1 | 2 | 3; // 审核状态：1-待审核 2-审核成功 3-审核失败
type VIPStatus = 1 | 2; // 是否需要VIP：1-不需要 2-需要

export interface Question {
  /** 主键ID */
  id: number;
  /** 标题 */
  title: string;
  /** 难度（非空） */
  difficulty: DifficultyLevel;
  /** 内容 */
  content: string;
  /** 标签列表（JSON数组） */
  tags: string[];
  /** 推荐答案 */
  answer: string;
  /** 审核状态（非空，默认1） */
  adult_status: AuditStatus;
  /** 排序（非空，默认0） */
  priority: number;
  /** 浏览量（默认0） */
  view_num: number;
  /** 点赞量（默认0） */
  thumb_num: number;
  /** 收藏量（默认0） */
  favour_num: number;
  /** 是否需要VIP查看（默认0） */
  need_vip?: VIPStatus;
  /** 创建用户ID（非空） */
  user_id: number;
  user: {
    username: string;
  };
  /** 创建时间（非空，默认当前时间） */
  created_at: Date;
  /** 更新时间（非空，默认当前时间） */
  updated_at: Date;
}

export interface QuestionAdultLog {
  id: number;
  remark: string;
  created_at: string;
  user: {
    username: string;
  };
}
