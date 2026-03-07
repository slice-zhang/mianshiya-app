export enum AdultStatus {
  PENDING = 1,
  SUCCESS,
  FAIL,
}

/**
 * 审核状态
 */
export const adultStatusMap: Record<number, string> = {
  [AdultStatus.PENDING]: "待审核",
  [AdultStatus.SUCCESS]: "审核通过",
  [AdultStatus.FAIL]: "审核不通过",
};

export const difficultyOptions = [
  {
    label: "简单",
    value: 1,
  },
  {
    label: "中等",
    value: 2,
  },
  {
    label: "困难",
    value: 3,
  },
];

export const vipOptions = [
  {
    label: "否",
    value: 1,
  },
  {
    label: "是",
    value: 2,
  },
];

export const adultStatusOptions = [
  {
    label: adultStatusMap[AdultStatus.PENDING],
    value: AdultStatus.PENDING,
  },
  {
    label: adultStatusMap[AdultStatus.SUCCESS],
    value: AdultStatus.SUCCESS,
  },
  {
    label: adultStatusMap[AdultStatus.FAIL],
    value: AdultStatus.FAIL,
  },
];
