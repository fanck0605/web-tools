import type { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.addHTMLHeadScripts(() => [
    '!function(){var a=sessionStorage,b="GITHUB_PAGES_REDIRECT",c=a.getItem(b);c&&(a.removeItem(b),history.replaceState(null,"",c))}()',
  ]);
};
