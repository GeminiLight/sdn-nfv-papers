# 论文检索与筛选指南

本文档用于指导 SDN/NFV 网络资源分配论文的人工检索、筛选、分类与录入。目标是提高覆盖率，同时避免不相关、重复或未经核验的论文进入 `data/papers.csv`。

## 1. 检索原则

- 采用“领域对象 + 资源决策 + 可选方法”的组合检索，不使用单一大关键词覆盖所有方向。
- 优先补充近期年份和当前目录覆盖较弱的类别、方向，但不为追求数量而降低准入标准。
- 从近期论文、重要 venue 和引用关系三个入口交叉检索。
- 自动或数据库推荐只能产生候选论文，最终收录必须经过人工判断与元数据核验。

## 2. 关键词矩阵

### 领域对象

```text
"network function virtualization"
"virtual network function" OR VNF
"service function chain" OR SFC
"network slicing"
"virtual network embedding" OR VNE
"network softwarization"
```

### 资源决策

```text
"resource allocation"
placement OR deployment OR embedding OR mapping
orchestration OR scheduling OR scaling
migration OR reconfiguration
routing OR "traffic engineering"
"admission control"
```

### 方法词（可选）

```text
optimization OR ILP OR MILP
approximation OR heuristic OR metaheuristic
"reinforcement learning" OR "deep reinforcement learning"
GNN OR "multi-agent" OR "online algorithm"
```

示例：

```text
("service function chain" OR VNF OR NFV)
AND (placement OR scheduling OR routing OR "resource allocation")
AND (optimization OR heuristic OR "reinforcement learning")
```

每次应按 Slicing、Chaining、Deployment、Scheduling 和 Routing 分别检索，避免一个查询混入过多无关结果。

## 3. 三层搜索

### 3.1 近期论文

- [arXiv](https://arxiv.org/)：发现近期预印本。
- [OpenAlex](https://openalex.org/) 和 Semantic Scholar：主题搜索、相似论文与引用关系扩展。
- Google Scholar：补充跨来源检索和前向引用。

### 3.2 重要 venue

优先检查与本项目相关的会议和期刊：

```text
SIGCOMM, NSDI, CoNEXT, INFOCOM, ICNP
TON, TMC, TPDS, TSC, JSAC, TNSM
CNSM, IM, NOMS, IEEE NFV-SDN
```

可结合站点限定搜索：

```text
site:ieeexplore.ieee.org "service function chain" placement
site:dl.acm.org NFV "resource allocation"
```

### 3.3 引用链

- 从高质量 Survey 向后检查参考文献。
- 从代表性论文向前检查 citing papers。
- 检查核心作者团队的近期相关工作。
- 查找预印本的正式发表版本、扩展版本、代码与数据。

## 4. 收录条件

论文必须同时满足：

1. SDN、NFV、VNF、SFC、网络切片或 VNE 是核心场景。
2. 资源分配决策是核心研究问题，而不是背景描述。
3. 论文提出明确方法，并提供理论、实验或系统评估证据。
4. 标题、作者、年份和稳定标识能够从可靠来源核验。

通常不收录：

- 只讨论架构而没有资源分配方法的论文。
- 与 SDN/NFV 没有直接关系的通用网络 AI 工作。
- 纯安全、异常检测或预测工作，且不影响资源决策。
- 只在引言中提到 network slicing、NFV 或 SFC 的论文。
- 内容重复的预印本与正式版本。
- 缺少明确方法或有效评估的概念性工作。

## 5. 筛选状态

### Include

主题高度相关，方法与评估完整，元数据可以可靠核验。

### Pending

相关性较高，但分类、正式发表状态、标识或代码归属仍需确认。所有疑问应集中记录，最后统一请用户确认。

### Exclude

不满足核心场景或资源决策条件、与现有记录重复，或无法可靠核验。应保留简短排除理由，避免重复检查。

所有候选结论统一写入 `data/screening.csv`。`candidate_id` 优先使用 DOI，其次使用 arXiv ID；`reason` 应描述决定性边界，不只写“无关”。Include 记录在正式进入 catalog 后仍可保留，作为检索批次的审计轨迹。

## 6. 去重规则

按以下优先级识别同一论文：

```text
DOI > arXiv ID > 标准化标题 + 第一作者 + 年份
```

预印本已有正式 DOI 时，原则上保留一个主记录，并将另一版本放入 `other_urls`。不要仅因标题标点、大小写或作者缩写不同而创建新记录。

## 7. 分类与字段提取

- `categories` 根据核心求解方法判断，而不是根据标题关键词判断。
- `directions` 根据主要资源决策变量判断。
- 混合论文可以填写多个值，但决定 README 展示位置的主类别和主方向必须放在最前面。
- `keywords` 记录场景、算法、约束和关键技术，避免重复标题中的宽泛词语。
- `objectives` 尽量使用统一表达，例如：

```text
Placement cost -; Latency -; Acceptance ratio +; Energy consumption -
```

## 8. 元数据核验顺序

1. 出版商或会议官方页面。
2. DOI 与 [Crossref](https://www.crossref.org/) 元数据。
3. arXiv 页面。
4. 作者主页或官方项目仓库。
5. 其他可靠学术数据库。

正式录入前逐项检查：标题、作者顺序、venue、正式出版年份、DOI/arXiv ID、论文链接，以及代码或数据是否确实属于该论文。

## 9. 每批检索流程

1. 明确年份、方向和方法范围。
2. 记录使用的数据库与检索式。
3. 在 `data/screening.csv` 建立 Include、Pending、Exclude 三类候选记录。
4. 先按稳定标识去重，再阅读摘要和问题定义。
5. 逐项核验 Include 论文并填写 `papers.csv`、`taxonomy.csv` 和 `provenance.csv`；新 venue 同步登记到 `venues.csv`。
6. 将 Pending 问题集中交给用户确认。
7. 更新 `data/papers.csv` 后运行：

```bash
python3 -m unittest discover -s tests -v
python3 scripts/validate_catalog.py
python3 scripts/generate_readme.py
python3 scripts/generate_readme.py --check
```

只有通过生成一致性检查后，该批论文更新才算完成。
