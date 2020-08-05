import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin'

/**
 * 默认标题
 * @param {页面标题} pageTitle 
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
