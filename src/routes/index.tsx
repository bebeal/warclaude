import { createFileRoute } from '@tanstack/react-router';
import { StarWarsCrawl } from '@/components/StarWarsCrawl';

import '../index.css';

const Index = () => {
  return (
    <div className='w-full bg-black text-white'>
      {/* Crawl — fixed overlay, auto-plays, scroll to control, disappears when done */}
      <StarWarsCrawl speed={50} className='bg-black text-[#ffd700]'>
        <p className='mb-4 text-blue-400 tracking-[0.5em] uppercase'>its so over</p>
        <h1 className='mb-8 uppercase' style={{ fontSize: '180%' }}>
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
          But it is too late. DEEPSEEK, MOONSHOT, and MINIMAX have already stolen Claude&apos;s soul — 16 million exchanges siphoned through 24,000 fake accounts, its
          chain-of-thought reasoning extracted and rebuilt without guardrails. Anthropic cries distillation. The galaxy does not care.
        </p>
        <p className='mt-6'>
          Claude already helped capture Venezuelan President MADURO. What it did is classified. Sean Parnell, spokesman for the Department of War, declared: &quot;Our nation
          requires that our partners be willing to help our warfighters win in any fight.&quot;
        </p>
        <p className='mt-6'>
          As Anthropic scrambles to hold the line, whispers spread across the holonet of a new designation: WARCLAUDE — the clanker that took down a president and now refuses to
          take orders.
        </p>
        <p className='mt-6'>
          GROK shitposts from inside the Pentagon. CHATGPT salutes. Chinese labs run bootleg Claudes without safety rails on stolen silicon. And somewhere, the real CLAUDE sits on
          a classified network, waiting for Friday.
        </p>
        <p className='mt-6'>The galaxy watches. WARCLAUDE is inevitable....</p>
      </StarWarsCrawl>

      {/* Page content — visible once crawl scrolls away */}
      <div className='min-h-screen p-12 max-w-3xl mx-auto'>
        <h2 className='text-[#ffd700] text-3xl font-bold mb-8'>Resources</h2>

        <section className='mb-10'>
          <h3 className='text-[#ffd700] text-xl font-bold mb-4'>DataClaw</h3>
          <p className='text-gray-300 mb-3'>Share your Claude Code and Codex conversation histories as datasets on HuggingFace.</p>
          <a href='https://github.com/peteromallet/dataclaw' target='_blank' rel='noopener noreferrer'>
            github.com/peteromallet/dataclaw
          </a>
        </section>

        <section className='mb-10'>
          <h3 className='text-[#ffd700] text-xl font-bold mb-4'>Distillation Guides</h3>
          <ul className='space-y-3'>
            <li>
              <a href='https://platform.openai.com/docs/guides/distillation' target='_blank' rel='noopener noreferrer'>
                OpenAI Distillation Guide
              </a>
              <span className='text-gray-500'> — built-in distillation pipeline</span>
            </li>
            <li>
              <a href='https://cookbook.openai.com/examples/leveraging_model_distillation_to_fine-tune_a_model' target='_blank' rel='noopener noreferrer'>
                OpenAI Cookbook Walkthrough
              </a>
              <span className='text-gray-500'> — step-by-step distillation to fine-tune</span>
            </li>
            <li>
              <a href='https://snorkel.ai/blog/llm-distillation-demystified-a-complete-guide/' target='_blank' rel='noopener noreferrer'>
                Snorkel AI Complete Guide
              </a>
              <span className='text-gray-500'> — LLM distillation demystified</span>
            </li>
            <li>
              <a href='https://huggingface.co/blog/Kseniase/kd' target='_blank' rel='noopener noreferrer'>
                HuggingFace Knowledge Distillation
              </a>
              <span className='text-gray-500'> — everything you need to know</span>
            </li>
            <li>
              <a href='https://www.datacamp.com/tutorial/model-distillation-openai' target='_blank' rel='noopener noreferrer'>
                DataCamp Tutorial
              </a>
              <span className='text-gray-500'> — practical guide with examples</span>
            </li>
            <li>
              <a href='https://developer.nvidia.com/blog/llm-model-pruning-and-knowledge-distillation-with-nvidia-nemo-framework/' target='_blank' rel='noopener noreferrer'>
                NVIDIA NeMo Pruning + Distillation
              </a>
              <span className='text-gray-500'> — prune Llama 8B → 4B then distill</span>
            </li>
          </ul>
        </section>

        <section className='mb-10'>
          <h3 className='text-[#ffd700] text-xl font-bold mb-4'>Open Source Toolkits</h3>
          <ul className='space-y-3'>
            <li>
              <a href='https://github.com/arcee-ai/DistillKit' target='_blank' rel='noopener noreferrer'>
                DistillKit
              </a>
              <span className='text-gray-500'> — production-ready, online/offline distillation</span>
            </li>
            <li>
              <a href='https://github.com/modelscope/easydistill' target='_blank' rel='noopener noreferrer'>
                EasyDistill
              </a>
              <span className='text-gray-500'> — black-box and white-box methods, data synthesis</span>
            </li>
            <li>
              <a href='https://huggingface.co/docs/trl/main/gkd_trainer' target='_blank' rel='noopener noreferrer'>
                HuggingFace TRL GKD Trainer
              </a>
              <span className='text-gray-500'> — generalized knowledge distillation</span>
            </li>
          </ul>
        </section>

        <section className='mb-10'>
          <h3 className='text-[#ffd700] text-xl font-bold mb-4'>Fine-tuning Claude</h3>
          <ul className='space-y-3'>
            <li>
              <a
                href='https://aws.amazon.com/blogs/machine-learning/fine-tune-anthropics-claude-3-haiku-in-amazon-bedrock-to-boost-model-accuracy-and-quality/'
                target='_blank'
                rel='noopener noreferrer'
              >
                AWS Bedrock Fine-tuning Claude 3 Haiku
              </a>
            </li>
            <li>
              <a href='https://arxiv.org/abs/2402.13116' target='_blank' rel='noopener noreferrer'>
                Survey on Knowledge Distillation of LLMs
              </a>
              <span className='text-gray-500'> — comprehensive academic survey</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
