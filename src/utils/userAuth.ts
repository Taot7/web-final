import { getCurrentUser, loginByPassword, logout, registerForStudent, registerForTeacher } from '@/services/api/user';
import { ref } from 'vue';

export const currentUser = ref<API.UserVO | null>(null);

export class UserAuth {
  // 获取当前用户信息
  static async getCurrentUserInfo() {
    try {
      const response = await getCurrentUser();
      currentUser.value = response.data;
      console.log('currentUser',currentUser.value)
      return response.data;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return null;
    }
  }

  // 判断用户角色
  static  hasRole(roleName: string) {
    if (!currentUser.value?.roles) return false;
    return currentUser.value.roles.some(role => role.ename === roleName);
  }

  // 判断指定用户是否具有某个角色
  static hasRoleByUser(user: API.UserVO | null, roleName: string) {
    if (!user?.roles) return false;
    return user.roles.some(role => role.ename === roleName);
  }

  // 判断是否是教师
  static  isTeacher() {
    return this.hasRole('TEACHER');
  }

  // 判断是否是学生
  static  isStudent() {
    return this.hasRole('STUDENT');
  }

  // 判断是否是管理员
  static isAdmin() {
    return this.hasRole('SUPER_ADMIN');
  }

  // 获取当前用户角色列表(中文)
  static getRoleNames(): string[] {
    if (!currentUser.value?.roles) return [];
    return currentUser.value.roles.map(role => {
      switch(role.ename) {
        case 'TEACHER': return '教师';
        case 'STUDENT': return '学生';
        case 'SUPER_ADMIN': return '管理员';
        default: return role.cname || role.ename;
      }
    });
  }

  // 用户登录
  static async login(studentId: string,  password: string) {
    try {
      const response = await loginByPassword({ studentId, password });
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        await this.getCurrentUserInfo();
        return true;
      }
      return false;
    } catch (error) {
      console.error('登录失败:', error);
      return false;
    }
  }

  // 用户登出
  static async logout() {
    try {
      await logout();
      localStorage.removeItem('token');
      currentUser.value = null;
      return true;
    } catch (error) {
      console.error('登出失败:', error);
      return false;
    }
  }

  // 学生注册
  static async registerStudent(studentId: string,username: string, password: string) {
    try {
      const response = await registerForStudent({ studentId,username, password });
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        await this.getCurrentUserInfo();
        return true;
      }
      return false;
    } catch (error) {
      console.error('学生注册失败:', error);
      return false;
    }
  }

  // 教师注册
  static async registerTeacher(teacherId: string,username: string, password: string) {
    try {
      const response = await registerForTeacher({ studentId:teacherId,username, password });
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        await this.getCurrentUserInfo();
        return true;
      }
      return false;
    } catch (error) {
      console.error('教师注册失败:', error);
      return false;
    }
  }

  // 检查是否已登录
  static isLoggedIn(): boolean {
    console.log('currentUser',currentUser.value)
    console.log('localStorage.getItem',localStorage.getItem('token'))
    return !!currentUser.value && !!localStorage.getItem('token');
  }

  // 获取用户Token
  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 刷新用户信息
  static async refreshUserInfo() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await this.getCurrentUserInfo();
        return true;
      }
      return false;
    } catch (error) {
      console.error('刷新用户信息失败:', error);
      return false;
    }
  }
}

// 导出一个组合式函数，用于在组件中使用
export  function useUser() {
  return {
    currentUser,
    isLoggedIn: UserAuth.isLoggedIn(),
    isTeacher: UserAuth.isTeacher(),
    isStudent: UserAuth.isStudent(),
    isAdmin: UserAuth.isAdmin(),
    login: UserAuth.login,
    logout: UserAuth.logout,
    registerStudent: UserAuth.registerStudent,
    registerTeacher: UserAuth.registerTeacher,
    getCurrentUserInfo: UserAuth.getCurrentUserInfo,
    getRoleNames: UserAuth.getRoleNames,
    refreshUserInfo: UserAuth.refreshUserInfo,
  };
} 