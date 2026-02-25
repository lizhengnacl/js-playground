/**
 * 复制文本内容到剪切板
 * @param {string} text - 要复制的文本内容
 * @param {object} [options] - 配置选项
 * @param {boolean} [options.silent=false] - 是否静默执行（不显示提示）
 * @returns {Promise<boolean>} - 是否复制成功
 */
async function copyToClipboard(text, options = {}) {
  const { silent = false } = options

  // 输入验证
  if (typeof text !== 'string') {
    if (!silent) {
      console.error('copyToClipboard: text 参数必须是字符串')
    }
    return false
  }
  if (text === '') {
    if (!silent) {
      console.warn('copyToClipboard: 复制的文本为空')
    }
    return true // 空字符串复制不算失败
  }

  try {
    // 方法1: 现代浏览器API（推荐）
    if (navigator && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text)
        if (!silent) {
          console.log('copyToClipboard: 内容已复制')
        }
        return true
      } catch (clipboardError) {
        // 权限被拒绝或其他错误，降级到旧方法
        if (!silent && clipboardError.name === 'NotAllowedError') {
          console.warn('copyToClipboard: 剪切板权限被拒绝，尝试降级方法')
        }
        // 继续尝试降级方案
      }
    }

    // 方法2: 旧版浏览器（已废弃的 fallback 方式）
    if (document && document.execCommand) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)

      try {
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')

        if (successful && !silent) {
          console.log('copyToClipboard: 内容已复制')
        }
        return successful
      } finally {
        // 确保无论如何都会移除临时元素
        document.body.removeChild(textArea)
      }
    }

    // 方法3: Node.js环境
    if (typeof window === 'undefined' && process && process.versions && process.versions.node) {
      try {
        const clipboardy = await import('clipboardy')
        // 兼容不同模块格式
        const writeFn = clipboardy.default?.write || clipboardy.write
        await writeFn(text)
        if (!silent) {
          console.log('copyToClipboard: 内容已复制')
        }
        return true
      } catch (importError) {
        if (!silent) {
          console.error('copyToClipboard: 无法导入clipboardy，请先安装：npm install clipboardy')
        }
        return false
      }
    }

    // 所有方法都失败
    if (!silent) {
      console.error('copyToClipboard: 不支持的复制到剪切板环境')
    }
    return false
  } catch (error) {
    if (!silent) {
      console.error('copyToClipboard: 复制失败:', error)
    }
    return false
  }
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = copyToClipboard
} else if (typeof window !== 'undefined') {
  window.copyToClipboard = copyToClipboard
}
