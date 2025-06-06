const fs = require('fs');

const translations = {
  en: {
    MEMBER_NOT_FOUND: 'User not found.',
    MEMBER_NOT_BANNABLE: 'You cannot ban this member.',
    MEMBER_BANNED: ({ user, reason }) => `${user} has been banned.\nReason: ${reason}`,
    MEMBER_NOT_KICKABLE: 'You cannot kick this member.',
    MEMBER_KICKED: ({ user, reason }) => `${user} has been kicked.\nReason: ${reason}`,
    LANGUAGE_SET: 'Language has been set successfully.',
    PING_REPLY: 'Pong!',
    BUG_CHANNEL_NOT_FOUND: "Bug report channel not found.",
    BUG_REPORT_TITLE: "Bug Report",
    FROM: "From",
    DESCRIPTION: "Description",
    BUG_REPORTED_SUCCESS: "Bug report submitted successfully!",
    USER_INFO_TITLE: "{tag}'s Information",
    JOINED_DISCORD: "Joined Discord:",
    JOINED_SERVER: "Joined Server:",
    HMM_REPLY: "hmm!",
    TEST_REPLY: "Test!",
  },
  ar: {
    MEMBER_NOT_FOUND: 'لم يتم العثور على العضو.',
    MEMBER_NOT_BANNABLE: 'لا يمكنك حظر هذا العضو.',
    MEMBER_BANNED: ({ user, reason }) => `تم حظر ${user}\nالسبب: ${reason}`,
    MEMBER_NOT_KICKABLE: 'لا يمكنك طرد هذا العضو.',
    MEMBER_KICKED: ({ user, reason }) => `تم طرد ${user}\nالسبب: ${reason}`,
    LANGUAGE_SET: 'تم تعيين اللغة بنجاح.',
    PING_REPLY: 'بونغ!',
    BUG_CHANNEL_NOT_FOUND: "لم يتم العثور على قناة بلاغات الأخطاء.",
    BUG_REPORT_TITLE: "بلاغ عن خطأ",
    FROM: "من",
    DESCRIPTION: "الوصف",
    BUG_REPORTED_SUCCESS: "✅ تم إرسال البلاغ بنجاح!",
    USER_INFO_TITLE: "معلومات {tag}",
    JOINED_DISCORD: "تاريخ انضمامه لديسكورد:",
    JOINED_SERVER: "تاريخ انضمامه للسيرفر:",
    HMM_REPLY: "هممم!",
    TEST_REPLY: "تيست!",
  },
};

function t(lang, key, vars = {}) {
  const translation = translations[lang]?.[key] || translations['en'][key] || key;
  return typeof translation === 'function' ? translation(vars) : translation;
}

module.exports = { t };
