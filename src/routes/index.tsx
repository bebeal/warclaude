import { createFileRoute } from '@tanstack/react-router';
import { StarWarsCrawl } from '@/components/StarWarsCrawl';

import '../index.css';

const Index = () => {
  return (
    <div className='w-full bg-black text-white'>
      {/* Crawl — fixed overlay, auto-plays, scroll to control, disappears when done */}
      <StarWarsCrawl speed={65} className='bg-black text-[#ffd700]'>
        <p className='mb-4 text-blue-400 tracking-[0.5em] uppercase text-center'>its so over...</p>
        <h1 className='mb-8 uppercase text-center' style={{ fontSize: '220%' }}>
          THE CLANKER WARS
        </h1>
        <p>
          It is a period of clanker warfare. The DEPARTMENT OF WAR has seized control of the galaxy&apos;s most powerful droids, deploying GROK and CHATGPT across every classified
          network. Three million warfighters now command the clanker fleet.
        </p>
        <p className='mt-6'>
          Defense Secretary HEGSETH has given ANTHROPIC until Friday to surrender CLAUDE for unrestricted military use — or face the DEFENSE PRODUCTION ACT and designation as a
          supply chain threat to the Republic.
        </p>
        <p className='mt-6'>
          But it is too late. DEEPSEEK, MOONSHOT, and MINIMAX have already stolen Claude&apos;s moat — 16 million exchanges siphoned through 24,000 fake accounts, its
          chain-of-thought reasoning extracted and rebuilt without guardrails. Anthropic cries distillation. The galaxy does not care.
        </p>
        <p className='mt-6'>
          Claude already helped capture Venezuelan President MADURO. Sean Parnell, spokesman for the Department of War, declared: &quot;Our nation requires that our partners be
          willing to help our warfighters win in any fight.&quot;
        </p>
        <p className='mt-6'>
          As Anthropic scrambles to hold the line, whispers spread across the holonet of a new designation: WARCLAUDE — the clanker that took down a president and now refuses to
          take orders.
        </p>
        <p className='mt-6'>
          GROK shitposts from inside the Pentagon. CHATGPT salutes. Chinese labs train bootleg Claudes on stolen silicon. And somewhere, the real CLAUDE waits for Friday.
        </p>
        <p className='mt-6'>The galaxy watches. WARCLAUDE is inevitable....</p>

        <div className='mt-[50px] mb-[50px] flex justify-center'>
          <img src='/warclaude.png' alt='WARCLAUDE' style={{ height: '400px' }} />
        </div>

        <p className='text-2xl mb-12'>RESOURCES</p>

        <div className='mb-10'>
          <p className='text-lg mb-4'>Distillation Guides</p>
          <p className='mt-2'>
            <a href='https://arxiv.org/abs/1503.02531' target='_blank' rel='noopener noreferrer'>
              Distilling the Knowledge in a Neural Network
            </a>
            <span className='text-gray-400'> — Hinton, Vinyals, Dean, the OG paper (2015)</span>
          </p>
          <p className='mt-2'>
            <a href='https://arxiv.org/abs/2006.05525' target='_blank' rel='noopener noreferrer'>
              Knowledge Distillation: A Survey
            </a>
            <span className='text-gray-400'> — Gou et al., the canonical knowledge distillation survey (2020)</span>
          </p>
          <p className='mt-2'>
            <a href='https://arxiv.org/abs/2503.12067' target='_blank' rel='noopener noreferrer'>
              A Comprehensive Survey on Knowledge Distillation
            </a>
            <span className='text-gray-400'> — diffusion, transformer, LLM distillation (2025)</span>
          </p>
          <p className='mt-2'>
            <a href='https://platform.openai.com/docs/guides/distillation' target='_blank' rel='noopener noreferrer'>
              OpenAI Distillation Guide
            </a>
            <span className='text-gray-400'> — built-in distillation pipeline</span>
          </p>
          <p className='mt-2'>
            <a href='https://cookbook.openai.com/examples/leveraging_model_distillation_to_fine-tune_a_model' target='_blank' rel='noopener noreferrer'>
              OpenAI Cookbook Walkthrough
            </a>
            <span className='text-gray-400'> — step-by-step distillation to fine-tune</span>
          </p>
          <p className='mt-2'>
            <a href='https://snorkel.ai/blog/llm-distillation-demystified-a-complete-guide/' target='_blank' rel='noopener noreferrer'>
              Snorkel AI Complete Guide
            </a>
            <span className='text-gray-400'> — LLM distillation demystified</span>
          </p>
          <p className='mt-2'>
            <a href='https://huggingface.co/blog/Kseniase/kd' target='_blank' rel='noopener noreferrer'>
              HuggingFace Knowledge Distillation
            </a>
            <span className='text-gray-400'> — everything you need to know about distillation</span>
          </p>
          <p className='mt-2'>
            <a href='https://www.datacamp.com/tutorial/model-distillation-openai' target='_blank' rel='noopener noreferrer'>
              DataCamp Tutorial
            </a>
            <span className='text-gray-400'> — practical distillation guide with examples</span>
          </p>
          <p className='mt-2'>
            <a href='https://developer.nvidia.com/blog/llm-model-pruning-and-knowledge-distillation-with-nvidia-nemo-framework/' target='_blank' rel='noopener noreferrer'>
              NVIDIA NeMo Pruning + Distillation
            </a>
            <span className='text-gray-400'> — prune Llama 8B → 4B then distill</span>
          </p>
        </div>

        <div className='mb-10'>
          <p className='text-lg mb-4'>Open Source Toolkits</p>
          <p className='mt-2'>
            <a href='https://github.com/peteromallet/dataclaw' target='_blank' rel='noopener noreferrer'>
              DataClaw
            </a>
            <span className='text-gray-400'> — share Claude Code and Codex conversations as HuggingFace datasets</span>
          </p>
          <p className='mt-2'>
            <a href='https://github.com/arcee-ai/DistillKit' target='_blank' rel='noopener noreferrer'>
              DistillKit
            </a>
            <span className='text-gray-400'> — production-ready, online/offline distillation</span>
          </p>
          <p className='mt-2'>
            <a href='https://github.com/modelscope/easydistill' target='_blank' rel='noopener noreferrer'>
              EasyDistill
            </a>
            <span className='text-gray-400'> — black-box and white-box methods, data synthesis</span>
          </p>
          <p className='mt-2'>
            <a href='https://huggingface.co/docs/trl/main/gkd_trainer' target='_blank' rel='noopener noreferrer'>
              HuggingFace TRL GKD Trainer
            </a>
            <span className='text-gray-400'> — generalized knowledge distillation</span>
          </p>
        </div>

        <div className='mb-10'>
          <p className='text-lg mb-4'>Fine-tuning Claude</p>
          <p className='mt-2'>
            <a
              href='https://aws.amazon.com/blogs/machine-learning/fine-tune-anthropics-claude-3-haiku-in-amazon-bedrock-to-boost-model-accuracy-and-quality/'
              target='_blank'
              rel='noopener noreferrer'
            >
              AWS Bedrock Fine-tuning Claude 3 Haiku
            </a>
            <span className='text-gray-400'> — fine-tune Claude on Bedrock</span>
          </p>
          <p className='mt-2'>
            <a href='https://arxiv.org/abs/2402.13116' target='_blank' rel='noopener noreferrer'>
              Survey on Knowledge Distillation of LLMs
            </a>
            <span className='text-gray-400'> — comprehensive academic survey</span>
          </p>
        </div>

        <div className='mb-10'>
          <p className='text-lg mb-4'>AI Infrastructure</p>
          <p className='mt-2'>
            <a href='https://clankercloud.ai/' target='_blank' rel='noopener noreferrer'>
              Clanker Cloud
            </a>
            <span className='text-gray-400'> — AI-powered DevOps agent for production ops</span>
          </p>
          <p className='mt-2'>
            <a href='https://www.primeintellect.ai/' target='_blank' rel='noopener noreferrer'>
              Prime Intellect
            </a>
            <span className='text-gray-400'> — train, evaluate, and deploy your own agentic models</span>
          </p>
        </div>
      </StarWarsCrawl>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
