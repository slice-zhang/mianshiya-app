import UserRoleEnum from "./accessEnum";
/**
 * 检测权限
 * @param userRole
 * @returns
 */
const checkAccess = (
  userRole: number,
  targetRole: number = UserRoleEnum.NOT_AUTH
) => {
  const role = userRole ? userRole : UserRoleEnum.NOT_AUTH;
  if (targetRole === UserRoleEnum.NOT_AUTH) {
    return true;
  }

  if (targetRole === UserRoleEnum.ADMIN) {
    if (role !== UserRoleEnum.ADMIN) {
      return false;
    }
  }
  if (targetRole === UserRoleEnum.USER) {
    if (role !== UserRoleEnum.USER) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
