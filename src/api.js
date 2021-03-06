import Vue from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'
Vue.prototype.$ajax = axios;

// axios.defaults.baseURL = 'http://192.168.255.17:8085';
axios.defaults.baseURL = 'http://admin.dev.yoursmiyu.com';


axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * 登录
 */
export const miyu = {
    login: (callback, data, error) => {
        let request = {
            url: '/admin/login',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改密码
    editor_password: (callback, data, error) => {
        let request = {
            url: '/admin/updateAdminInfo',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
};
/**
 * 获取oss上传
 */
export const oss = {
    update: (callback, data, error) => {
        let request = {
            url: '/sts/credentials/oss',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    }
};
/**
 * 用户管理
 */
export const user = {
    // 统计列表
    tongji: (callback, data, error) => {
        let request = {
            url: '/user/userManagementStatisticalList',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取用户头像
    head: (callback, data, error) => {
        let request = {
            url: '/user/getDefaultAvatar',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 新增头像
    add_head: (callback, data, error) => {
        let request = {
            url: '/defaultAvatar/insertDefaultAvatar',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除头像
    delete_head: (callback, data, error) => {
        let request = {
            url: '/defaultAvatar/deleteDefaultAvatar',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // news
    newV: (callback, data, error) => {
        let request = {
            url: '/user/userCategories',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改大V时间
    delete_Vdate: (callback, data, error) => {
        let request = {
            url: '/system/updateUserUpgrade',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 筛选搜索
    search_shaixuan: (callback, data, error) => {
        let request = {
            url: '/user/screeningSearch',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 精准搜索
    search_jz: (callback, data, error) => {
        let request = {
            url: '/user/advancedSearch',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 个人档案
    personal_file: (callback, data, error) => {
        let request = {
            url: '/user/personalFile',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 个人主页
    personal_home: (callback, data, error) => {
        let request = {
            url: '/article/personalHomepage',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 个人主页-删除
    personal_home_delete: (callback, data, error) => {
        let request = {
            url: '/article/deleteArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 用户的语音库
    user_soundku: (callback, data, error) => {
        let request = {
            url: '/voice/selectMallVoiceByUserId',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 用户的购买的语音库
    user_bySound: (callback, data, error) => {
        let request = {
            url: '/voice/selectMallBuyVoiceByUserId',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 用户交易明细-收支明细&支出明细
    user_incomeDetails: (callback, data, error) => {
        let request = {
            url: '/bill/selectBillHistory',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取用户没有的标签
    get_user_nolabel: (callback, data, error) => {
        let request = {
            url: '/user/tagsUsersHave',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改用户标签
    editor_user_label: (callback, data, error) => {
        let request = {
            url: '/user/updateUserLabels',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
  // 修改用户级别
  editor_user_role: (callback, data, error) => {
    let request = {
      url: '/user/updateUserGrade',
      method: 'post',
      data: data
    };
    ajax(callback, request, error);
  },
  //查询大V列表
  selectUserLevelList: (callback, data, error) => {
    let request = {
      url: '/system/selectUserLevelList',
      method: 'post',
      data: data
    };
    ajax(callback, request, error);
  },
  //更换大V声音属性
  updateUserLevelSoundType: (callback, data, error) => {
    let request = {
      url: '/system/updateUserLevelSoundType',
      method: 'post',
      data: data
    };
    ajax(callback, request, error);
  },
  //更换大V排序
  updateUserLevelSort: (callback, data, error) => {
    let request = {
      url: '/system/updateUserLevelSort',
      method: 'post',
      data: data
    };
    ajax(callback, request, error);
  },
  //更改大V技能鉴定
  updateUserLevelSkill: (callback, data, error) => {
    let request = {
      url: '/system/updateUserLevelSkill',
      method: 'post',
      data: data
    };
    ajax(callback, request, error);
  },
};
/**
 * 标签管理
 */
export const label = {
    label_list: (callback, data, error) => {
        let request = {
            url: '/label/selectAllLabel',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 添加标签
    label_add: (callback, data, error) => {
        let request = {
            url: '/label/insertLabel',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除标签
    label_delete: (callback, data, error) => {
        let request = {
            url: '/label/deleteLabel',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 设置为热门
    label_hot: (callback, data, error) => {
        let request = {
            url: '/label/setHot',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 取消热门
    label_cancelHot: (callback, data, error) => {
        let request = {
            url: '/label/cancelHot',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 秀音类目
    sound_list: (callback, data, error) => {
        let request = {
            url: '/userTakeNotesColumn/selectUserTakeNotesColumnGroupByType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 添加秀音类目
    sound_add: (callback, data, error) => {
        let request = {
            url: '/userTakeNotesColumn/insertUserTakeNotesColumn',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除秀音类目
    sound_delete: (callback, data, error) => {
        let request = {
            url: '/userTakeNotesColumn/deleteUserTakeNotesColumn',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取hot可选数量
    hot_num: (callback, data, error) => {
        let request = {
            url: '/label/selectAnOptionalTag',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改hot可选数量
    hot_num_editor: (callback, data, error) => {
        let request = {
            url: '/label/updateAnOptionalTag',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
};
/**
 * 语音商城
 */
export const store = {
    // 倾诉发标
    fabiao: (callback, data, error) => {
        let request = {
            url: '/pourOut/selectUserPourOut',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 倾诉接标
    jiebiao: (callback, data, error) => {
        let request = {
            url: '/pourOut/listenList',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 审核商城
    shenheStore: (callback, data, error) => {
        let request = {
            url: '/voice/voiceAudited',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 审核商城-审核通过
    shenheStore_pass: (callback, data, error) => {
        let request = {
            url: '/voice/verifiedMallVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 审核商城-审核不通过
    shenheStore_nopass: (callback, data, error) => {
        let request = {
            url: '/voice/unAuditedMallVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 查询商城
    select_store: (callback, data, error) => {
        let request = {
            url: '/voice/mallVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 查询商城-删除
    select_store_delete: (callback, data, error) => {
        let request = {
            url: '/voice/deleteMallVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 个人介绍
    personal_list: (callback, data, error) => {
        let request = {
            url: '/voice/selectSelfIntroduction',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 个人介绍-审核
    personal_sh: (callback, data, error) => {
        let request = {
            url: '/voice/reviewPersonalIntroduction',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 个人介绍-删除
    personal_delete: (callback, data, error) => {
        let request = {
            url: '/voice/deleteUserVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },

};
/**
 * 举报管理
 */
export const jubao = {
    jubao_list: (callback, data, error) => {
        let request = {
            url: '/report/manuallyCloseList',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 举报用户
    jubao_sealUp: (callback, data, error) => {
        let request = {
            url: '/report/bannedUsers',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 查封用户
    chafeng_list: (callback, data, error) => {
        let request = {
            url: '/report/bannedUsersList',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 解冻账户
    jiedong: (callback, data, error) => {
        let request = {
            url: '/report/unBannedUsers',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取举报内容
    jubao_content_list: (callback, data, error) => {
        let request = {
            url: '/report/selectReportReason',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 新增举报内容
    jubao_content_add: (callback, data, error) => {
        let request = {
            url: '/report/insertReportReason',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除举报内容
    jubao_content_delete: (callback, data, error) => {
        let request = {
            url: '/report/deleteReportReason',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改举报内容
    jubao_content_editor: (callback, data, error) => {
        let request = {
            url: '/report/updateReport',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //举报所有的用户
    jubao_content_reported: (callback, data, error) => {
        let request = {
            url: '/report/selectBannedUser',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    }
};
/**
 * 发现管理
 */
export const find = {
    offical_list: (callback, data, error) => {
        let request = {
            url: '/officialInfomation/selectOfficialInformation',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //获取热门标签
    selectHotLabel: (callback, data, error) => {
        let request = {
            url: '/label/selectHotLabel',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //新增消息
    offical_add: (callback, data, error) => {
        let request = {
            url: '/officialInfomation/insertOfficialInformation',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除消息
    offical_delete: (callback, data, error) => {
        let request = {
            url: '/officialInfomation/deleteOfficialInformation',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //推送活动
    activity_list: (callback, data, error) => {
        let request = {
            url: '/officialInfomation/selectPushInformation',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //添加推送活动
    activity_add: (callback, data, error) => {
        let request = {
            url: '/officialInfomation/insertPushInformation',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除推送活动
    activity_delete: (callback, data, error) => {
        let request = {
            url: '/officialInfomation/deletePushInformation',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //官方动态
    gfdt_list: (callback, data, error) => {
        let request = {
            url: '/officialArticle/selectOfficialArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //官方动态-删除评论
    gfdt_delete: (callback, data, error) => {
        let request = {
            url: '/officialArticle/deleteArticleComment',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除官方动态
    delete: (callback, data, error) => {
        let request = {
            url: '/officialArticle/deleteOfficialArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //发现审核
    find_audit: (callback, data, error) => {
        let request = {
            url: '/article/selectArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //审核不通过
    shenhe_nopass: (callback, data, error) => {
        let request = {
            url: '/officialArticle/deleteOrNoPassArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //审核通过
    // shenhe_pass: (callback, data, error) => {
    //     let request = {
    //         url: '/officialArticle/passArticle',
    //         method: 'post',
    //         data: data
    //     };
    //     ajax(callback, request, error);
    // },
    //审核通过分类
    shenhe_pass: (callback, data, error) => {
        let request = {
            url: '/officialArticle/checkArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //置顶推荐
    shenhe_tuijian: (callback, data, error) => {
        let request = {
            url: '/officialArticle/updateHotArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取评论
    get_pinglun: (callback, data, error) => {
        let request = {
            url: '/article/selectArticleReviews',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 审核通过并置顶
    pass_zhiding: (callback, data, error) => {
        let request = {
            url: '/officialArticle/passAuditPlaceTop',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 发现管理-官方动态-修改官方动态
    editor_dongtai: (callback, data, error) => {
        let request = {
            url: '/officialArticle/updateOfficialArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 发现管理-官方动态-新增官方动态
    add_dongtai: (callback, data, error) => {
        let request = {
            url: '/officialArticle/insertOfficialArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取官方头像 名字
    get_offical_head: (callback, data, error) => {
        let request = {
            url: '/system/officialHeadAndName',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //回复评论
    publish_comment: (callback, data, error) => {
        let request = {
            url: '/article/insertArticleReviews',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //批量审核
    passSelectArticle: (callback, data, error) => {
        let request = {
            url: '/article/passSelectArticle',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //是否设置为优质内容
    setHighQuality: (callback, data, error) => {
        let request = {
            url: '/article/setHighQuality',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //推荐文章分类
    updateCheckTypeAndType: (callback, data, error) => {
        let request = {
            url: '/officialArticle/updateCheckTypeAndType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //获取滚动内容
    getRollBroadcast: (callback, data, error) => {
        let request = {
            url: '/system/getWhileActivity',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //增加滚动广播
    addRollBroadcast: (callback, data, error) => {
        let request = {
            url: '/system/insertWhileActivity',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除滚动广播
    delRollBroadcast: (callback, data, error) => {
        let request = {
            url: '/system/deleteWhileActivity',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询录音列表
    selectRecordList: (callback, data, error) => {
        let request = {
            url: '/system/selectRecordList',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //录音审核
    checkRecord: (callback, data, error) => {
        let request = {
            url: '/system/checkRecord',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //录音分类
    updateRecordType: (callback, data, error) => {
        let request = {
            url: '/system/updateRecordType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
};
/**
 * 系统设置
 */
export const set = {
    // 关于我们
    about_list: (callback, data, error) => {
        let request = {
            url: '/aboutUs/selectAboutUs',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    about_editor: (callback, data, error) => {
        let request = {
            url: '/aboutUs/updateAboutUs',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 意见反馈
    opinion_list: (callback, data, error) => {
        let request = {
            url: '/feedback/selectAllFeedback',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 隐私与协议
    yinsi_list: (callback, data, error) => {
        let request = {
            url: '/privacyAndProtocol/selectPrivacyAndProtocol',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 隐私修改
    yinsi_editor: (callback, data, error) => {
        let request = {
            url: '/privacyAndProtocol/updatePrivacyAndProtocol',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 版本管理
    banben_list: (callback, data, error) => {
        let request = {
            url: '/appVersion/selectAppVersionService',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除版本
    banben_delete: (callback, data, error) => {
        let request = {
            url: '/appVersion/deleteAppVersion',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 新增版本
    banben_add: (callback, data, error) => {
        let request = {
            url: '/appVersion/insertAppVersion',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 申诉管理
    shensu_list: (callback, data, error) => {
        let request = {
            url: '/appeal/select',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 默认头像、语音设置
    default_set: (callback, data, error) => {
        let request = {
            url: '/system/defaultDisplay',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 默认头像、语音设置
    default_editor: (callback, data, error) => {
        let request = {
            url: '/system/updateDefaultDisplay',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // Apple Pay设置列表
    apple_pay_list: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/selectPurchasingRules',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // Apple Pay设置修改
    apple_pay_editor: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/updatePurchasingRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // Apple Pay设置删除
    apple_pay_delete: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/deletePurchasingRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // Apple Pay设置添加
    apple_pay_add: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/insertPurchasingRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 安卓支付 list
    android_pay_list: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/selectAndroidPurchasingRules',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 安卓支付 修改
    android_pay_editor: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/updateAndroidPurchasingRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 安卓支付 添加
    android_pay_add: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/insertAndroidPurchasingRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 安卓支付 删除
    android_pay_delete: (callback, data, error) => {
        let request = {
            url: '/purchasingRules/deleteAndroidPurchasingRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
  //  角色管理  列表
    role_list: (callback, data, error) => {
      let request = {
        url: '/admin/selectAdmins',
        method: 'post',
        data: data
      };
      ajax(callback, request, error);
    },
  //  角色管理  新增
    role_add: (callback, data, error) => {
      let request = {
        url: '/admin/insertAdmin',
        method: 'post',
        data: data
      };
      ajax(callback, request, error);
    },
  //  角色管理  修改
    role_editor: (callback, data, error) => {
      let request = {
        url: '/admin/updateAdmin',
        method: 'post',
        data: data
      };
      ajax(callback, request, error);
    },
  //  角色管理  删除
    role_delete: (callback, data, error) => {
      let request = {
        url: '/admin/deleteAdmin',
        method: 'post',
        data: data
      };
      ajax(callback, request, error);
    },
  //  角色管理  重置密码
    role_reset: (callback, data, error) => {
      let request = {
        url: '/admin/resetPassword',
        method: 'post',
        data: data
      };
      ajax(callback, request, error);
    },
  //  申诉删除
    shensu_delete: (callback, data, error) => {
      let request = {
        url: '/appeal/delete',
        method: 'post',
        data: data
      };
      ajax(callback, request, error);
    },
    //强制更新
    updateApp: (callback, data, error) => {
        let request = {
            url: '/appVersion/updateAppType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    }
};
/**
 * 财务管理
 */
export const money = {
    // 身份审核列表
    shenfen_list: (callback, data, error) => {
        let request = {
            url: '/authentication/selectAllAuthentication',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 身份审核
    shenfen_check: (callback, data, error) => {
        let request = {
            url: '/authentication/passOrNoAuthentication',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 提现收费
    tixian: (callback, data, error) => {
        let request = {
            url: '/withdraw/selectWithdrawRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 提现收费-修改
    tixian_editor: (callback, data, error) => {
        let request = {
            url: '/withdraw/updateWithdrawRule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 提现收费列表
    tixian_list: (callback, data, error) => {
        let request = {
            url: '/incomeDraw/select',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 审核提现
    shenhe_tx: (callback, data, error) => {
        let request = {
            url: '/incomeDraw/disposeIncomeWithdraw',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 财务账单
    caiwu_card: (callback, data, error) => {
        let request = {
            url: '/bill/checkPreview',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 获取当前手续费和最低提现
    low_money: (callback, data, error) => {
        let request = {
            url: '/system/withdrawalThresholdHandlingCharge',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 财务管理-用户账单-搜索
    user_bill_list: (callback, data, error) => {
        let request = {
            url: '/bill/selectFinancialManagementSearch',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 财务管理-用户账单明细
    user_bill_details: (callback, data, error) => {
        let request = {
            url: '/bill/selectFinancialManagement',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 财务管理-财务账单打印
    card_print: (callback, params, error) => {
        let request = {
            url: '/bill/checkPreviewPrint',
            method: 'post',
            params: params,
            responseType: 'blob',
        };
        ajax(callback, request, error);
    },
};
/**
 * 启动页管理
 */
export const qd = {
    // 启动页,引导页数据
    qd_img: (callback, data, error) => {
        let request = {
            url: '/startRescources/selectStartRescources',
            // url: '/voice/voiceAudited',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改启动页
    qd_editor: (callback, data, error) => {
        let request = {
            url: '/startRescources/updateStartRescources',
            // url: '/voice/voiceAudited',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 修改引导页
    yd_editor: (callback, data, error) => {
        let request = {
            url: '/startRescources/updateGuideRescources',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 删除引导页
    yd_del: (callback, data, error) => {
        let request = {
            url: '/startRescources/deleteGuideRescources',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },


};
// 管理员权限
export const admin = {
    // 管理员列表
    admin_list: (callback, data, error) => {
        let request = {
            url: '/user/selectManagerPermission',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询管理员
    admin_search: (callback, data, error) => {
        let request = {
            url: '/user/selectUserPermission',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //修改管理员权限
    admin_change: (callback, data, error) => {
        let request = {
            url: '/user/updateManagerPermission',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
}
//用户分析
export const userAnalysis = {
    //获取用户的日活 发帖量
    user_posting: (callback, data, error) => {
        let request = {
            url: '/feedback/getStatisticNum',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //获取登录用户数
    user_login: (callback, data, error) => {
        let request = {
            url: '/feedback/getLoginUserNum',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //短信群发
    sendMsg: (callback, data, error) => {
        let request = {
            url: '/userWangyiyun/sendMsg',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 注册埋点数据统计
    RegisteredDataStatistics: (callback, data, error) => {
        let request = {
            url: '/buriedPoint/selectBuriedPointRegister',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 模块埋点数据统计
    ModuleBuriedPointStatistics: (callback, data, error) => {
        let request = {
            url: '/buriedPoint/selectBuriedPointModule',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //注册埋点打印
    selectBuriedPointRegisterPrint: (callback, data, error) => {
        let request = {
            url: '/buriedPoint/selectBuriedPointRegisterPrint',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //模块埋点打印
    selectBuriedPointModulePrint: (callback, data, error) => {
        let request = {
            url: '/buriedPoint/selectBuriedPointModulePrint',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //添加轮播图
    addBanner: (callback, data, error) => {
        let request = {
            url: '/buriedPoint/insertWhilePicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
}

//动态分类管理
export const ClassificationManagement = {
    //增加分类
    IncreaseClassification: (callback, data, error) => {
        let request = {
            url: '/label/insertArticleType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除分类
    DeleteCategory: (callback, data, error) => {
        let request = {
            url: '/label/deleteArticleType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //更新分类
    UpdateClassification: (callback, data, error) => {
        let request = {
            url: '/label/updateArticleType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询分类
    QueryClassification: (callback, data, error) => {
        let request = {
            url: '/label/selectArticleType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询横图的内容
    QueryHorizontalContent: (callback, data, error) => {
        let request = {
            url: '/label/selectTypeAndPicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //更改类别的排序
    ChangeCategorySort: (callback, data, error) => {
        let request = {
            url: '/label/updateArticleTypeSort',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //增加图片
    AddPicture: (callback, data, error) => {
        let request = {
            url: '/label/insertPicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除图片
    DeleteImage: (callback, data, error) => {
        let request = {
            url: '/label/deletePicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询所有图片
    QueryAllImages: (callback, data, error) => {
        let request = {
            url: '/label/selectAllPicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //增加官方音频
    InsertOfficialAudio: (callback, data, error) => {
        let request = {
            url: '/label/insertOfficialVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除官方音频
    DeleteOfficialAudio: (callback, data, error) => {
        let request = {
            url: '/label/deleteOfficialVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //修改官方音频
    ModifyOfficialAudio: (callback, data, error) => {
        let request = {
            url: '/label/updateOfficialVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询官方音频
    QueryOfficialAudio: (callback, data, error) => {
        let request = {
            url: '/label/selectOfficialVoice',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //获取类别图片
    GetCategoryImage: (callback, data, error) => {
        let request = {
            url: '/label/selectPicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //更改图片排序
    ChangeImageOrder:  (callback, data, error) => {
        let request = {
            url: '/label/updatePictureSort',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //获取图片id
    getPictureIdByPicture:  (callback, data, error) => {
        let request = {
            url: '/label/getPictureIdByPicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //推荐人声显示类型
    insertRecommendHuman:  (callback, data, error) => {
        let request = {
            url: '/label/insertRecommendHuman',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //修改首页分类的图片 标题  简介
    editImg:  (callback, data, error) => {
        let request = {
            url: '/label/updatePicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //修改首页四张的标题和文字
    updateTypeAndPicture: (callback, data, error) => {
        let request = {
            url: '/label/updateTypeAndPicture',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
}

//作品分类管理
export const workClassify = {
    //添加录音作品分类
    insertProductionType: (callback, data, error) => {
        let request = {
            url: '/system/insertProductionType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除录音作品分类
    deleteProductionType: (callback, data, error) => {
        let request = {
            url: '/system/deleteProductionType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    // 查询录音作品分类
    selectProductionType: (callback, data, error) => {
        let request = {
            url: '/system/selectProductionType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //更新猜你喜欢
    updateRecordGuessLike: (callback, data, error) => {
        let request = {
            url: '/system/updateRecordGuessLike',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //上传官方录音作品
    insertOfficialRecord: (callback, data, error) => {
        let request = {
            url: '/system/insertOfficialRecord',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询猜你喜欢
    selectRecordGuessLike: (callback, data, error) => {
        let request = {
            url: '/system/selectRecordGuessLike',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //更换猜你喜欢列表排序
    updateGuessLikeSort: (callback, data, error) => {
        let request = {
            url: '/system/updateGuessLikeSort',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //添加背景音乐
    insertBackgroundMusic: (callback, data, error) => {
        let request = {
            url: '/system/insertBackgroundMusic',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //删除背景音乐
    deleteBackgroundMusic: (callback, data, error) => {
        let request = {
            url: '/system/deleteBackgroundMusic',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //查询背景音乐列表
    selectBackgroundMusic: (callback, data, error) => {
        let request = {
            url: '/system/selectBackgroundMusic',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //头像分类
    updateAvatarByType: (callback, data, error) => {
        let request = {
            url: '/defaultAvatar/updateAvatarByType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //新增头像
    insertDefaultAvatar: (callback, data, error) => {
        let request = {
            url: '/defaultAvatar/insertDefaultAvatar',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //根据头像分类查询头像
    selectAvatarByType: (callback, data, error) => {
        let request = {
            url: '/defaultAvatar/selectAvatarByType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
    //更新背景分类
    updateProductionType: (callback, data, error) => {
        let request = {
            url: '/system/updateProductionType',
            method: 'post',
            data: data
        };
        ajax(callback, request, error);
    },
}



function ajax(callback, request, error) {
    let token = window.localStorage.getItem('miyu.token');
    let api = request.url;
    let version = '1.0.0';
    let device = 'web';
    let timestamp = new Date().getTime();
    let secretKey = CryptoJS.HmacSHA1(device + '\n' + timestamp + '\n' + version, api).toString();
    let authorization = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse((token == null ? '' : token) + ':' + secretKey));
    if (!request.headers) {
        request.headers = {};
    }
    request.headers['Authorization-Device'] = device;
    request.headers['Authorization-Version'] = version;
    request.headers['Authorization-Timestamp'] = timestamp;
    request.headers['Authorization'] = authorization;
    if (!request.data) {
        request.data = {};
    }
    axios(request)
        .then((result) => {
            allHandle.handleSuccess(result, callback, error);
        })
        .catch((error) => {
            allHandle.handleCatch(error);
        })
}

export const allHandle = {
    handleSuccess() { },
    handleCatch() { }
};
