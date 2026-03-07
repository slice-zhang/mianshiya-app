import UserRoleEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

export interface MenuItem {
  key: string;
  label: string;
  access?: UserRoleEnum;
  children?: MenuItem[];
  [key: string]: any;
}

export const menuList: MenuItem[] = [
  {
    key: "/",
    label: "主页",
    access: UserRoleEnum.NOT_AUTH,
  },
  {
    key: "/questionBank",
    label: "题库",
    access: UserRoleEnum.NOT_AUTH,
  },
  {
    key: "/question",
    label: "题目",
    access: UserRoleEnum.NOT_AUTH,
  },
  {
    key: "/question/:questionId",
    label: "题目详情",
    hide: true,
    access: UserRoleEnum.NOT_AUTH,
  },
  {
    key: "/admin",
    label: "管理",
    access: UserRoleEnum.ADMIN,
    children: [
      {
        key: "/admin/question",
        label: "题目管理",
        access: UserRoleEnum.ADMIN,
      },
      {
        key: "/admin/user",
        label: "用户管理",
        access: UserRoleEnum.ADMIN,
      },
      {
        key: "/admin/questionBank",
        label: "题库管理",
        access: UserRoleEnum.ADMIN,
      },
      {
        key: "/admin/tag",
        label: "标签管理",
        access: UserRoleEnum.ADMIN,
      },
    ],
  },
];

/**
 * 根据 path 匹配菜单项（支持动态路由 :param 格式）
 * @param path 当前访问的路径，如 "/question/123"
 * @param menuList 菜单列表
 * @returns 匹配的菜单项 | null
 */
export const findMenuByPath = (
  path: string,
  menuList: MenuItem[]
): MenuItem | null => {
  // 遍历一级菜单
  for (const menu of menuList) {
    // 1. 完全匹配（静态路由），直接返回
    if (path === menu.key) {
      return menu;
    }

    // 2. 处理动态路由匹配
    const menuKeyParts = menu.key.split("/").filter(Boolean); // 拆分菜单key，如 [":questionId"]
    const pathParts = path.split("/").filter(Boolean); // 拆分当前路径，如 ["123"]

    // 路径段数量不一致，跳过
    if (menuKeyParts.length !== pathParts.length) {
      // 递归检查子菜单
      if (menu.children && menu.children.length) {
        const childMatch = findMenuByPath(path, menu.children);
        if (childMatch) return childMatch;
      }
      continue;
    }

    // 逐个段匹配：动态段(:xxx)匹配任意值，普通段必须完全相等
    let isMatched = true;
    for (let i = 0; i < menuKeyParts.length; i++) {
      const menuPart = menuKeyParts[i];
      const pathPart = pathParts[i];

      // 动态段（以:开头）：跳过校验
      if (menuPart.startsWith(":")) {
        continue;
      }

      // 普通段：必须完全相等，否则不匹配
      if (menuPart !== pathPart) {
        isMatched = false;
        break;
      }
    }

    // 3. 动态路由匹配成功，返回当前菜单
    if (isMatched) {
      return menu;
    }

    // 4. 递归检查子菜单
    if (menu.children && menu.children.length) {
      const childMatch = findMenuByPath(path, menu.children);
      if (childMatch) return childMatch;
    }
  }

  // 无匹配项
  return null;
};

/**
 * 根据 path 匹配所有菜单项
 * @param path
 * @returns
 */
export const findAllMenuByPath = (path: string): MenuItem | null => {
  return findMenuByPath(path, menuList);
};

/**
 * 根据用户角色过滤菜单项
 * @param userLogin
 * @returns
 */
export const filterMenuListByRole = (userRole: number = 0) => {
  return menuList.filter(
    (menu) => checkAccess(userRole, menu?.access) && !menu.hide
  );
};
