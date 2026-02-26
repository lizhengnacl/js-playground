# Claude Code Hooks 示例

本目录包含 Claude Code hooks 的 JavaScript 实现示例。

## Hook 文件说明

### hook_demo.js

一个演示 hook，展示如何：

- 使用 JavaScript 编写 hook 逻辑
- 检测工具调用是否命中特定规则
- 通过 JSON 输出在问答界面展示 hook 命中结果

#### 支持的规则

| 规则名称            | 描述                                      |
| ------------------- | ----------------------------------------- |
| JavaScript 文件操作 | 检测 `.js` 文件的 Write 或 Edit 操作      |
| 配置文件修改        | 检测 `.claude` 目录或包含 `config` 的文件 |
| Hello 文件检测      | 检测 `hello.js` 或包含 `Hello` 的文件     |

#### 输出示例

当 hook 命中时，会在问答界面输出如下 JSON：

```json
{
  "hookResult": {
    "status": "MATCHED",
    "timestamp": "2026-02-26T...",
    "tool": "Edit",
    "event": "PostToolUse",
    "details": {
      "matched": true,
      "rule": "JavaScript 文件操作",
      "reason": "Tool \"Edit\" matched rule: JavaScript 文件操作"
    },
    "session": {
      "id": "...",
      "cwd": "...",
      "permissionMode": "default"
    }
  }
}
```

## 配置

Hook 在 `.claude/settings.json` 中配置：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/hook_demo.js"
          }
        ]
      }
    ]
  }
}
```

## 使用步骤

1. 确保脚本有执行权限：

   ```bash
   chmod +x .claude/hooks/hook_demo.js
   ```

2. 在 settings.json 中配置 hook

3. 执行 Write 或 Edit 操作，hook 会自动触发

4. 在问答界面可以看到 hook 的 JSON 输出

## 测试

编辑任何 `.js` 文件即可触发 hook，如：

```bash
# 让 Claude 编辑 hello.js
```

你会看到 hook 输出显示是否命中规则。

## 自定义

要添加新规则，在 `hook_demo.js` 中的 `rules` 数组添加：

```javascript
{
  name: '你的规则名称',
  condition: (data) => {
    // 返回 true 或 false
    return data.tool_input?.file_path?.endsWith('.ts')
  }
}
```
