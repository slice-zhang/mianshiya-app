/**
 * 用户信息
 */
export interface UserData {
  /** id */
  id: number;
  /** 用户名 */
  username?: string | null;
  /** 用户头像 */
  user_avatar?: string | StaticImageData;
  /** 用户描述 */
  user_profile?: string | null;
  /** 会员过期时间 */
  vip_expire_time?: string | null;
  /** 会员编号 */
  vip_number?: number | null;
  /** 分享码 */
  share_code: string;
  /** 邀请人id */
  invite_user?: number | null;
  /**
   * 用户角色（非空，默认值 1）
   * 1: 普通用户 | 2: 管理员 | 3: 封禁
   */
  user_role: number;
  created_at: string;
  updated_at: string;
}
