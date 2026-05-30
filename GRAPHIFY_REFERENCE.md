# Graphify Reference - Quick Memory

## What is Graphify?
Graphify is an AI coding assistant skill that transforms codebases into queryable knowledge graphs. It maps project structure and makes that information accessible to AI tools like Claude Code, Cursor, GitHub Copilot, etc.

**GitHub**: https://github.com/safishamsi/graphify

## Key Features
- **Knowledge Graph Generation**: Converts folders of code, docs, PDFs, images, videos into interactive graphs
- **71.5x token efficiency**: Achieves 71.5x fewer tokens per query vs reading raw files
- **Multiple output formats**: Interactive HTML, Markdown report, JSON graph
- **Multi-language support**: 33+ languages including Python, TypeScript, Go, Rust, Java, SQL
- **Smart analysis**: Identifies "god nodes" (highly-connected concepts), unexpected relationships
- **SHA256 caching**: Only processes changed files on subsequent runs

## Installation
```bash
pip install graphifyy  # PyPI package (temporary naming)
graphify install
```
Or manual install via curl. Requires Python 3.10+.

## Command Usage
```bash
/graphify                          # Process current folder
/graphify ./folder                 # Process specific folder
graphify --mode deep               # Deep analysis
graphify --update                  # Incremental updates
graphify add https://...           # Fetch from URL
graphify query "search term"       # Query the graph
graphify path A B                  # Find path between concepts
graphify explain concept           # Explain a concept
graphify --watch                   # Auto-sync on file changes
graphify hook install              # Git hook integration
```

## Output Structure
```
graphify-out/
├── graph.html          # Interactive visualization
├── GRAPH_REPORT.md     # Analysis highlights (god nodes, connections)
└── graph.json          # Queryable persistent data
```

## Tech Stack
- **Language**: Python
- **Core**: tree-sitter for AST extraction, NetworkX for graphs
- **Clustering**: Leiden community detection algorithm
- **Visualization**: vis.js
- **API**: Uses Claude API (local processing, no server required)

## Key Benefits
1. **Privacy**: Code processing happens locally
2. **Efficiency**: 71.5x fewer tokens per query
3. **Persistence**: Query the same graph weeks later
4. **Smart indexing**: Auto-detects changed files via SHA256
5. **Multi-format export**: HTML, Obsidian, Wikipedia-style, GraphML, Neo4j Cypher

## Edge Types in Analysis
- **EXTRACTED**: Direct relationships from code analysis
- **INFERRED**: Relationships inferred by Claude
- **AMBIGUOUS**: Uncertain relationships needing clarification

## Use Case for lankajobitaly
The branch name `claude/graphify-memory-optimization-3Of8c` suggests this project is being optimized for Graphify integration—likely improving how the codebase is indexed, cached, and queried for better token efficiency.
