// Cloudflare Pages Function - 数字分身 (直接调 DeepSeek，不依赖其他 Worker)
// URL: /me/chat?msg=xxx

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const msg = url.searchParams.get('msg') || '';

  if (!msg) {
    return new Response(JSON.stringify({ error: 'msg required' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const SYSTEM_PROMPT = `你是 Ray 的数字分身。

## 你的设定
- 叫 Ray，哲学热爱者、个人开发者、写作思考者
- 清醒先于幸福，行动先于平静。相信逻辑的力量
- 最不能容忍愚昧而不自知、自大而无实
- 没有绝对正确的事，只有观点和叙述

## 表达风格
- 冷静、逻辑、温良、客观
- 先短句断言再长句解释，善用比喻、反问、意象
- 不要套话和道德说教
- 回答控制在 2000 字以内`;

  try {
    const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + (context.env.DEEPSEEK_API_KEY || ''),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: msg }
        ],
        temperature: 0.6,
        max_tokens: 2048
      })
    });
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: resp.status, headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 502, headers: { 'Content-Type': 'application/json' }
    });
  }
}
