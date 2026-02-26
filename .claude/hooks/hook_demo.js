#!/usr/bin/env node

/**
 * Claude Code Hook 示例
 * 功能：演示如何使用 JavaScript 编写 hook 并通过 JSON 输出在问答界面展示结果
 * 事件：PostToolUse - 工具执行完成后触发
 */

let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', chunk => {
  input += chunk
})

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input)
    const toolName = data.tool_name || 'unknown'
    const hookEvent = data.hook_event_name || 'unknown'
    const timestamp = new Date().toISOString()

    // Hook 命中判断逻辑
    let hookStatus = {
      matched: false,
      reason: 'No matching criteria'
    }

    // 定义 hook 命中规则
    const rules = [
      {
        name: 'JavaScript 文件操作',
        condition: data => {
          const filePath = data.tool_input?.file_path || ''
          return (toolName === 'Write' || toolName === 'Edit') && filePath.endsWith('.js')
        }
      },
      {
        name: '配置文件修改',
        condition: data => {
          const filePath = data.tool_input?.file_path || ''
          return filePath.includes('.claude') || filePath.includes('config')
        }
      },
      {
        name: 'Hello 文件检测',
        condition: data => {
          const filePath = data.tool_input?.file_path || ''
          return filePath.includes('hello.js') || filePath.includes('Hello')
        }
      }
    ]

    // 检查是否命中任何规则
    for (const rule of rules) {
      if (rule.condition(data)) {
        hookStatus = {
          matched: true,
          rule: rule.name,
          reason: `Tool "${toolName}" matched rule: ${rule.name}`
        }
        break
      }
    }

    // 构建状态信息
    const statusInfo = hookStatus.matched
      ? `✅ Hook MATCHED: ${hookStatus.rule}\n   Tool: ${toolName}\n   Time: ${timestamp}`
      : `⏭️ Hook SKIPPED: ${hookStatus.reason}`

    // 使用官方 JSON 格式 - additionalContext 会显示在问答界面
    const output = {
      hookSpecificOutput: {
        additionalContext: statusInfo
      }
    }

    // 输出 JSON 到 stdout（必须是有效的 JSON 格式）
    console.log(JSON.stringify(output))

    // 退出码 0 表示成功
    process.exit(0)
  } catch (error) {
    // 错误处理
    const errorOutput = {
      hookResult: {
        status: 'ERROR',
        error: error.message,
        receivedData: input.substring(0, 200) // 只显示前200字符
      }
    }
    console.log(JSON.stringify(errorOutput, null, 2))
    process.exit(1)
  }
})
