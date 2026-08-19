# CS336: Language Modeling from Scratch

Self-study of [Stanford CS336 (Spring 2026)](https://cs336.stanford.edu/) — building language models from the ground up.

Instructors: Percy Liang & Tatsu Hashimoto

## Course Structure

| Week | Lectures | Assignment | Focus |
|------|----------|------------|-------|
| 1-2 | 01-04 | Assignment 1 | Tokenization, Transformer, Training |
| 3-4 | 05-08 | Assignment 2 | GPUs, Kernels, Parallelism |
| 5-6 | 09-11 | Assignment 3 | Scaling Laws |
| 7-8 | 12-14 | Assignment 4 | Evaluation, Data Processing |
| 9-10 | 15-17 | Assignment 5 | Alignment (DPO, GRPO) |

## Repository Structure

```
.
├── Lectures/
│   ├── 01 Overview, tokenization [Percy]/
│   ├── 02 PyTorch, resource accounting [Percy]/
│   ├── 03 Architectures, hyperparameters [Tatsu]/
│   ├── 04 Attention alternatives, MoE [Tatsu]/
│   ├── 05 GPUs, TPUs [Tatsu]/
│   ├── 06 Kernels, Triton [Percy]/
│   ├── 07 Parallelism [Percy]/
│   ├── 08 Parallelism [Tatsu]/
│   ├── 09 Scaling laws [Tatsu]/
│   ├── 10 Inference [Percy]/
│   ├── 11 Scaling laws [Tatsu]/
│   ├── 12 Evaluation [Percy]/
│   ├── 13 Data - sources, datasets [Percy]/
│   ├── 14 Data - filtering, dedup, mixing [Percy]/
│   ├── 15 Mid-post-training (SFT-RLHF) [Tatsu]/
│   ├── 16 Post-training - RLVR [Tatsu]/
│   ├── 17 Alignment - multimodality [Percy]/
│   └── shared/                          # references.py, utilities
├── Assignments/
│   ├── 1-Basics/                        # BPE, Transformer, AdamW
│   ├── 2-Systems/                       # Triton kernels, DDP
│   ├── 3-Scaling/                       # Scaling laws
│   ├── 4-Data/                          # HTML→text, filtering, MinHash
│   └── 5-Alignment/                     # DPO, GRPO
└── Notes/                               # Personal study notes
```

## Resources

- [Course Website](https://cs336.stanford.edu/)
- [Lecture Recordings (YouTube)](https://www.youtube.com/watch?v=JuoVZkPBiKk&list=PLoROMvodv4rMqXOcazWaTUHhq-yembLCV)
- [Spring 2025 Archive](https://cs336.stanford.edu/spring2025/)

## Progress

| Assignment | Status | Notes |
|------------|--------|-------|
| 1 - Basics | Not Started | |
| 2 - Systems | Not Started | |
| 3 - Scaling | Not Started | |
| 4 - Data | Not Started | |
| 5 - Alignment | Not Started | |
