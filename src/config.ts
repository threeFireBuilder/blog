export const site = {
  title: 'ThreeFire · 三火的博客',
  author: 'ThreeFire',
  description: '记录技术探索、学习笔记与实践中的思考。',
  github: 'https://github.com/threeFireBuilder',
  repository: 'https://github.com/threeFireBuilder/blog',
};

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const formatDate = (date: Date) => date.toLocaleDateString('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai',
});
